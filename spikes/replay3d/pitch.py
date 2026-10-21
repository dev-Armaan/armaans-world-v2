"""Shared pitch model for the replay3d spike.

Coordinate system (used by every module in this spike):
  - units are metres, pitch is 105 x 68
  - origin at the centre spot
  - x runs along the length of the pitch, -52.5 (left goal line) .. +52.5 (right goal line)
  - y runs along the width, -34 (far/top touchline in the minimap) .. +34 (near/bottom touchline)
  - z is height above the grass (0 on the pitch, positive up)

The minimap draws +x to the right and +y downward, so "near touchline" (the one closest to
the main broadcast camera) is at the bottom of the minimap.
"""

from __future__ import annotations

import math

import cv2
import numpy as np

LENGTH = 105.0
WIDTH = 68.0
HALF_L = LENGTH / 2
HALF_W = WIDTH / 2

PENALTY_DEPTH = 16.5
PENALTY_WIDTH = 40.32
GOAL_AREA_DEPTH = 5.5
GOAL_AREA_WIDTH = 18.32
CENTER_CIRCLE_R = 9.15
PENALTY_SPOT_DIST = 11.0
GOAL_WIDTH = 7.32
GOAL_HEIGHT = 2.44


def _rect(x0: float, x1: float, y0: float, y1: float) -> list[np.ndarray]:
    return [
        np.array([[x0, y0], [x1, y0]]),
        np.array([[x1, y0], [x1, y1]]),
        np.array([[x1, y1], [x0, y1]]),
        np.array([[x0, y1], [x0, y0]]),
    ]


def _arc(cx: float, cy: float, r: float, a0: float, a1: float, n: int = 48) -> np.ndarray:
    t = np.linspace(a0, a1, n)
    return np.stack([cx + r * np.cos(t), cy + r * np.sin(t)], axis=1)


def pitch_polylines() -> list[np.ndarray]:
    """All pitch markings as (N, 2) polylines in pitch metres (z = 0)."""
    lines: list[np.ndarray] = []
    lines += _rect(-HALF_L, HALF_L, -HALF_W, HALF_W)
    lines.append(np.array([[0.0, -HALF_W], [0.0, HALF_W]]))
    lines.append(_arc(0.0, 0.0, CENTER_CIRCLE_R, 0, 2 * math.pi, 96))
    for side in (-1, 1):
        gx = side * HALF_L
        px = gx - side * PENALTY_DEPTH
        ax = gx - side * GOAL_AREA_DEPTH
        lines += _rect(min(gx, px), max(gx, px), -PENALTY_WIDTH / 2, PENALTY_WIDTH / 2)[0:3:2] + [
            np.array([[px, -PENALTY_WIDTH / 2], [px, PENALTY_WIDTH / 2]])
        ]
        lines += _rect(min(gx, ax), max(gx, ax), -GOAL_AREA_WIDTH / 2, GOAL_AREA_WIDTH / 2)[0:3:2] + [
            np.array([[ax, -GOAL_AREA_WIDTH / 2], [ax, GOAL_AREA_WIDTH / 2]])
        ]
        spot_x = gx - side * PENALTY_SPOT_DIST
        # Penalty arc: the part of the circle around the spot that lies outside the box.
        half = math.acos((PENALTY_DEPTH - PENALTY_SPOT_DIST) / CENTER_CIRCLE_R)
        mid = math.pi if side == 1 else 0.0
        lines.append(_arc(spot_x, 0.0, CENTER_CIRCLE_R, mid - half, mid + half, 32))
    return lines


def pitch_keypoints() -> dict[str, tuple[float, float]]:
    """Named intersection points that line-based calibration can match against."""
    kp: dict[str, tuple[float, float]] = {
        "center": (0.0, 0.0),
        "half_top": (0.0, -HALF_W),
        "half_bottom": (0.0, HALF_W),
        "circle_top": (0.0, -CENTER_CIRCLE_R),
        "circle_bottom": (0.0, CENTER_CIRCLE_R),
    }
    for name, side in (("L", -1), ("R", 1)):
        gx = side * HALF_L
        px = gx - side * PENALTY_DEPTH
        ax = gx - side * GOAL_AREA_DEPTH
        kp[f"{name}_corner_top"] = (gx, -HALF_W)
        kp[f"{name}_corner_bottom"] = (gx, HALF_W)
        kp[f"{name}_box_goal_top"] = (gx, -PENALTY_WIDTH / 2)
        kp[f"{name}_box_goal_bottom"] = (gx, PENALTY_WIDTH / 2)
        kp[f"{name}_box_top"] = (px, -PENALTY_WIDTH / 2)
        kp[f"{name}_box_bottom"] = (px, PENALTY_WIDTH / 2)
        kp[f"{name}_area_goal_top"] = (gx, -GOAL_AREA_WIDTH / 2)
        kp[f"{name}_area_goal_bottom"] = (gx, GOAL_AREA_WIDTH / 2)
        kp[f"{name}_area_top"] = (ax, -GOAL_AREA_WIDTH / 2)
        kp[f"{name}_area_bottom"] = (ax, GOAL_AREA_WIDTH / 2)
        kp[f"{name}_spot"] = (gx - side * PENALTY_SPOT_DIST, 0.0)
    return kp


def inside_pitch(xy: np.ndarray, margin: float = 3.0) -> np.ndarray:
    """Boolean mask of points within the pitch (plus a run-off margin in metres)."""
    xy = np.asarray(xy, dtype=float).reshape(-1, 2)
    return (np.abs(xy[:, 0]) <= HALF_L + margin) & (np.abs(xy[:, 1]) <= HALF_W + margin)


class Minimap:
    """Top-down pitch canvas. pitch metres <-> canvas pixels."""

    def __init__(self, scale: float = 8.0, pad: float = 5.0):
        self.scale = scale
        self.pad = pad
        self.w = int(round((LENGTH + 2 * pad) * scale))
        self.h = int(round((WIDTH + 2 * pad) * scale))

    def to_px(self, xy: np.ndarray) -> np.ndarray:
        xy = np.asarray(xy, dtype=float).reshape(-1, 2)
        px = (xy[:, 0] + HALF_L + self.pad) * self.scale
        py = (xy[:, 1] + HALF_W + self.pad) * self.scale
        return np.stack([px, py], axis=1)

    def base(self) -> np.ndarray:
        img = np.zeros((self.h, self.w, 3), np.uint8)
        img[:] = (60, 130, 60)
        for line in pitch_polylines():
            pts = self.to_px(line).round().astype(np.int32)
            cv2.polylines(img, [pts], False, (240, 240, 240), 2, cv2.LINE_AA)
        return img


def project_pitch_to_image(H_pitch2img: np.ndarray, xy: np.ndarray) -> np.ndarray:
    """Apply a 3x3 pitch->image homography to (N, 2) pitch points (z = 0)."""
    xy = np.asarray(xy, dtype=float).reshape(-1, 1, 2)
    return cv2.perspectiveTransform(xy, np.asarray(H_pitch2img, dtype=float)).reshape(-1, 2)


def project_image_to_pitch(H_img2pitch: np.ndarray, uv: np.ndarray) -> np.ndarray:
    """Apply a 3x3 image->pitch homography to (N, 2) image points."""
    uv = np.asarray(uv, dtype=float).reshape(-1, 1, 2)
    return cv2.perspectiveTransform(uv, np.asarray(H_img2pitch, dtype=float)).reshape(-1, 2)


def draw_pitch_overlay(frame: np.ndarray, H_pitch2img: np.ndarray, color=(0, 255, 255), thickness: int = 2) -> np.ndarray:
    """Draw every pitch marking reprojected into the frame. The main visual calibration check."""
    out = frame.copy()
    h, w = out.shape[:2]
    for line in pitch_polylines():
        dense = _densify(line, step=0.5)
        uv = project_pitch_to_image(H_pitch2img, dense)
        ok = np.isfinite(uv).all(axis=1) & (np.abs(uv[:, 0]) < 4 * w) & (np.abs(uv[:, 1]) < 4 * h)
        # Only draw contiguous runs of valid points so lines behind the camera don't wrap around.
        run: list[np.ndarray] = []
        for p, good in zip(uv, ok):
            if good:
                run.append(p)
            elif len(run) > 1:
                cv2.polylines(out, [np.array(run).round().astype(np.int32)], False, color, thickness, cv2.LINE_AA)
                run = []
            else:
                run = []
        if len(run) > 1:
            cv2.polylines(out, [np.array(run).round().astype(np.int32)], False, color, thickness, cv2.LINE_AA)
    return out


def _densify(poly: np.ndarray, step: float) -> np.ndarray:
    pts = [poly[0]]
    for a, b in zip(poly[:-1], poly[1:]):
        n = max(1, int(np.ceil(np.linalg.norm(b - a) / step)))
        for k in range(1, n + 1):
            pts.append(a + (b - a) * k / n)
    return np.array(pts)
