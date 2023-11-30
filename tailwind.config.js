/** @type {import('tailwindcss').Config} */

// from Figma: The Design System - Foundations -> Color Guidance
const colors_plus = require('./Figma_Variables/output1.json');
const tailwind_classes = require('./Figma_Variables/output2.json');
const css_variables = require('./Figma_Variables/output3.json');
const primary_offsets = require('./Figma_Variables/theme_color_offsets.json');

const { black, white, ...colors } = colors_plus;
const {light_offset, dark_offset } = primary_offsets;
const {darkMode: dark_mode_css, lightMode: light_mode_css } = css_variables;
/* ------------------------------------- *\
/*  Define the Theme Color Globally!!!   *\
\*  Options: gray, night, sky, sea, blue, teal, green, yellow, orange, red, rose, pink, purple,
\* ------------------------------------- */
const prime = "purple".toLowerCase();

export default {
  content: [
	'./index.html',
	'./src/**/*.{js,ts,vue}',
],
  darkMode: 'class',
  theme: {
    extend: {
		borderRadius:{
			/* Warning: Overriding Tailwind Default Border Radiuses */
			"radius-xs": "var(--rounded-xs, 4px)", // 4px
			"radius-sm": "var(--rounded-sm, 8px)", // 8px
			"radius-md": "var(--rounded-md, 12px)", // 12-16
			"radius-lg": "var(--rounded-lg, 16px)", // 16-24
			"radius-xl": "var(--rounded-xl, 20px)", // 20-32
			"radius-full": "var(--rounded-full)",
		  },
		colors: {
			// Tailwind Figma Variable Color Classes
			...tailwind_classes,
			primary: {
				1: 'var(--primary-1)',
				2: 'var(--primary-2)',
				3: 'var(--primary-3)',
			},
			secondary: {
				1: 'var(--secondary-1)',
				2: 'var(--secondary-2)',
				3: 'var(--secondary-3)',
			},
			tertiary: {
				1: 'var(--tertiary-1)'
			},
			...colors,
		},
      // from Figma: The Design System - Foundations -> Effects  [ Elevation ]
      boxShadow: {
        'elevation-01': 'var(--elevation-01)',
        'elevation-02': 'var(--elevation-02)',
        'elevation-03': 'var(--elevation-03)',
        'elevation-04': 'var(--elevation-04)',
        'elevation-05': 'var(--elevation-05)',
        'depth-01': 'var(--depth-01)',
        'depth-02': 'var(--depth-02)',
        'depth-03': 'var(--depth-03)',
        'depth-04': 'var(--depth-04)',
        'depth-05': 'var(--depth-05)',
      },
      maxWidth: {
        lg: '33rem',
        '2xl': '40rem',
        '3xl': '50rem',
        '5xl': '66rem',
      },
      opacity: {
        1: '0.01',
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
      fontFamily: {
        lato: ['Lato'],
        helvetica: ['Helvetica'],
        'now': ['HelveticaNow'],
      },
      spacing: {
        '3xs': 'var(--spacing-3xs, 4px)', // 4px
        '2xs': 'var(--spacing-2xs, 8px)', // 8px
        'xs': 'var(--spacing-xs, 12px)',  // 12px
        'sm': 'var(--spacing-sm, 16px)',  // 16px
        'md': 'var(--spacing-md, 20px)',  // 20px
        'lg': 'var(--spacing-lg, 24px)',  // 24px
        'xl': 'var(--spacing-xl, 28px)',  // 28-32
        '2xl': 'var(--spacing-2xl, 32px)',// 32-48
        '3xl': 'var(--spacing-3xl, 36px)',// 36-60
        // '1%': '1%',
        // '2%': '2%',
        // '3%': '3%',
        // '4%': '4%',
        // '5%': '5%',
        // '10%': '10%',
        // '15%': '15%',
        // '20%': '20%',
        // '25%': '25%',
        // '45%': '45%',
        // '48%': '48%',
        // '98%': '98%',
        // '97%': '97%',
        // '96%': '96%',
        // '95%': '95%',
        // '94%': '94%',
        // '93%': '93%',
        // '92%': '92%',
        // '91%': '91%',
        // '90%': '90%',
      },
    },
  },
  plugins: [
	//require('@tailwindcss/typography'),
	function ({ addBase }) {
	  addBase({
		'@media (min-width: 1280px)': {
			':root': {
			  // Desktop
			  '--spacing-3xs': '4px',
			  '--spacing-2xs': '8px',
			  '--spacing-xs': '12px',
			  '--spacing-sm': '16px',
			  '--spacing-md': '20px',
			  '--spacing-lg': '24px',
			  '--spacing-xl': '32px',
			  '--spacing-2xl': '48px',
			  '--spacing-3xl': '60px',
			  '--rounded-xs': '4px',
			  '--rounded-sm': '8px',
			  '--rounded-md': '16px',
			  '--rounded-lg': '24px',
			  '--rounded-xl': '32px',
			  '--rounded-full': '9999px',
			},
		},
		'@media (max-width: 767px)': {
			':root': {
			  // Mobile
			  '--spacing-3xs': '4px',
			  '--spacing-2xs': '8px',
			  '--spacing-xs': '12px',
			  '--spacing-sm': '16px',
			  '--spacing-md': '20px',
			  '--spacing-lg': '24px',
			  '--spacing-xl': '28px', // increases
			  '--spacing-2xl': '32px', // increases
			  '--spacing-3xl': '36px', // increases
			  '--rounded-xs': '4px',
			  '--rounded-sm': '8px',
			  '--rounded-md': '12px', // increases
			  '--rounded-lg': '16px', // increases
			  '--rounded-xl': '20px', // increases
			  '--rounded-full': '9999px',
			},
		},
		'@media (min-width: 768px) and (max-width: 1279px)': {
			':root': {
			  // In Between
			  '--spacing-3xs': '4px',
			  '--spacing-2xs': '8px',
			  '--spacing-xs': '12px',
			  '--spacing-sm': '16px',
			  '--spacing-md': '20px',
			  '--spacing-lg': '24px',
			  '--spacing-xl': '32px',
			  '--spacing-2xl': '40px',
			  '--spacing-3xl': '48px',
			  '--rounded-xs': '4px',
			  '--rounded-sm': '8px',
			  '--rounded-md': '16px',
			  '--rounded-lg': '20px',
			  '--rounded-xl': '24px',
			  '--rounded-full': '9999px',
			},
		},
		':root:not(.dark)': {
		  ...light_mode_css,
		  '--secondary-1': colors[prime]['50'],
		  '--secondary-2': colors[prime]['100'],
		  '--secondary-3': colors[prime]['200'],
		  '--primary-1': colors[prime][light_offset[prime][0]],
		  '--primary-2': colors[prime][light_offset[prime][1]],
		  '--primary-3': colors[prime][light_offset[prime][2]],
		  '--tertiary-1': colors[prime]['900'],
	   },
	   ':root.dark': {
	  	...dark_mode_css,
		  '--secondary-1': colors[prime]['900'],
		  '--secondary-2': colors[prime]['800'],
		  '--secondary-3': colors[prime]['700'],
		  '--primary-1': colors[prime][dark_offset[prime][0]],
		  '--primary-2': colors[prime][dark_offset[prime][1]],
		  '--primary-3': colors[prime][dark_offset[prime][2]],
		  '--tertiary-1': colors[prime]['50'],
	   }
	  });
	},
  ]
}
