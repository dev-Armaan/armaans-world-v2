# Fonts

This project now uses Google Fonts instead of local fonts:

- Space Grotesk (Bold) - Used for headings and replaces Ki Bold
- DM Sans (Regular, Medium) - Used for body text and replaces PP Neue Montreal

These fonts are automatically loaded via the Next.js font system in the layout.tsx file.

If you want to switch back to local fonts:
1. Place the following font files in this directory:
   - KiBold.woff2
   - PPNeueMontreal-Book.woff2
   - PPNeueMontreal-Medium.woff2
2. Update the layout.tsx file to use localFont instead of Google Fonts
3. Update the font variables and classes in globals.css and tailwind.config.js

