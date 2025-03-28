/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     darkMode: ["class"],
//     content: [
//       './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//       './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//       './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//     ],
//     theme: {
//       container: {
//         center: true,
//         padding: "2rem",
//         screens: {
//           "2xl": "1400px",
//         },
//       },
//       extend: {
//         colors: {
//           border: "hsl(var(--border))",
//           input: "hsl(var(--input))",
//           ring: "hsl(var(--ring))",
//           background: "hsl(var(--background))",
//           foreground: "hsl(var(--foreground))",
//           primary: {
//             DEFAULT: "hsl(var(--primary))",
//             foreground: "hsl(var(--primary-foreground))",
//           },
//           secondary: {
//             DEFAULT: "hsl(var(--secondary))",
//             foreground: "hsl(var(--secondary-foreground))",
//           },
//           destructive: {
//             DEFAULT: "hsl(var(--destructive))",
//             foreground: "hsl(var(--destructive-foreground))",
//           },
//           muted: {
//             DEFAULT: "hsl(var(--muted))",
//             foreground: "hsl(var(--muted-foreground))",
//           },
//           accent: {
//             DEFAULT: "hsl(var(--accent))",
//             foreground: "hsl(var(--accent-foreground))",
//           },
//           card: {
//             DEFAULT: "hsl(var(--card))",
//             foreground: "hsl(var(--card-foreground))",
//           },
//           popover: {
//             DEFAULT: "hsl(var(--popover))",
//             foreground: "hsl(var(--popover-foreground))",
//           },
//         },
//         borderRadius: {
//           lg: "var(--radius)",
//           md: "calc(var(--radius) - 2px)",
//           sm: "calc(var(--radius) - 4px)",
//         },
//         keyframes: {
//           "accordion-down": {
//             from: { height: 0 },
//             to: { height: "var(--radix-accordion-content-height)" },
//           },
//           "accordion-up": {
//             from: { height: "var(--radix-accordion-content-height)" },
//             to: { height: 0 },
//           },
//           "pulse": {
//             "0%, 100%": { opacity: 1 },
//             "50%": { opacity: 0.5 },
//           },
//           "bounce": {
//             "0%, 100%": {
//               transform: "translateY(-25%)",
//               animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
//             },
//             "50%": {
//               transform: "translateY(0)",
//               animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
//             },
//           },
//         },
//         animation: {
//           "accordion-down": "accordion-down 0.2s ease-out",
//           "accordion-up": "accordion-up 0.2s ease-out",
//           "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
//           "bounce": "bounce 1s infinite",
//         },
//         typography: {
//           DEFAULT: {
//             css: {
//               maxWidth: '65ch',
//               color: 'var(--foreground)',
//               '[class~="lead"]': {
//                 color: 'var(--foreground)',
//               },
//               a: {
//                 color: 'var(--primary)',
//                 textDecoration: 'underline',
//                 fontWeight: '500',
//               },
//               strong: {
//                 color: 'var(--foreground)',
//                 fontWeight: '600',
//               },
//               'ol[type="A"]': {
//                 '--list-counter-style': 'upper-alpha',
//               },
//               'ol[type="a"]': {
//                 '--list-counter-style': 'lower-alpha',
//               },
//               'ol[type="A" s]': {
//                 '--list-counter-style': 'upper-alpha',
//               },
//               'ol[type="a" s]': {
//                 '--list-counter-style': 'lower-alpha',
//               },
//               'ol[type="I"]': {
//                 '--list-counter-style': 'upper-roman',
//               },
//               'ol[type="i"]': {
//                 '--list-counter-style': 'lower-roman',
//               },
//               'ol[type="I" s]': {
//                 '--list-counter-style': 'upper-roman',
//               },
//               'ol[type="i" s]': {
//                 '--list-counter-style': 'lower-roman',
//               },
//               'ol[type="1"]': {
//                 '--list-counter-style': 'decimal',
//               },
//               'ol > li': {
//                 position: 'relative',
//               },
//               'ol > li::marker': {
//                 color: 'var(--muted-foreground)',
//               },
//               'ul > li': {
//                 position: 'relative',
//               },
//               'ul > li::marker': {
//                 color: 'var(--muted-foreground)',
//               },
//             },
//           },
//         },
//       },
//     },
//     plugins: [require('@tailwindcss/typography')],
//   }