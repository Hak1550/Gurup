/**
|--------------------------------------------------
| headerBackgroundStyle: gradient или color
| lessonItemBackgroundStyle: gradient или color
|--------------------------------------------------
*/
export const gurucanTheme = {
	light: {
		colors: {
			$accent: "#F53E75",
			$additionalColor: "#838383",
			$additionalTextColor: "#838383",
			$darkBgTextColor: "#FFFFFF",
			$accentBgTextColor: "#FFFFFF",
			$textColor: "#210F19",
			$itemBackground: "#F2F2F2",
			$screenBackgroundColor: "#FFFFFF",
			$successColor: "#65C691",
		},
		theme: "light"
	},
	dark: {
		colors: {
			// $accent: "#f53e3e",
			$accent: '#FCB03A',
			$additionalTextColor: '#777777',
			$additionalColor: '#777777',
			$textColor: '#FFFFFF',
			$darkBgTextColor: "#FFFFFF",
			$itemBackground: "#242424",
			$screenBackgroundColor: '#0B0B0B',
			$successColor: '#65C691',
			$accentBgTextColor: "#0B0B0B",
		},
		theme: "dark"
	}
}

export const legacyTemplates = {
	red: {
		colors: {
			accent: "#F53E75",
			additionalColor: "#838383",
			additionalTextColor: "#838383",
			darkBgTextColor: "#FFFFFF",
			accentBgTextColor: "#FFFFFF",
			textColor: "#210F19",
			itemBackground: "#F2F2F2",
			screenBackgroundColor: "#FFFFFF",
			successColor: "#65C691",
		},
		theme: "light",
	},
	green: {
		colors: {
			accent: "#10B48C",
			additionalColor: "#838383",
			additionalTextColor: "#838383",
			darkBgTextColor: "#FFFFFF",
			accentBgTextColor: "#FFFFFF",
			textColor: "#210F19",
			itemBackground: "#F2F2F2",
			screenBackgroundColor: "#FFFFFF",
			successColor: "#65C691",
		},
		theme: "light",
	},
	black: {
		colors: {
			accent: "#9671F2",
			// accent: "#940129", // university color
			additionalColor: "#838383",
			additionalTextColor: "#838383",
			darkBgTextColor: "#FFFFFF",
			accentBgTextColor: "#FFFFFF",
			textColor: "#210F19",
			itemBackground: "#F2F2F2",
			screenBackgroundColor: "#FFFFFF",
			successColor: "#65C691",
		},
		theme: "light",
	}
}

export const baseTemplates = {
	dark: {
		colors: {
			accent: '#22D8A1',
			additionalTextColor: '#777777',
			additionalColor: '#777777',
			textColor: '#FFFFFF',
			darkBgTextColor: "#FFFFFF",
			itemBackground: "#242424",
			screenBackgroundColor: '#0B0B0B',
			successColor: '#65C691',
			accentBgTextColor: "#0B0B0B",
		},
		theme: "dark",
	},
	light: {
		colors: {
			accent: "#10B48C",
			additionalColor: "#838383",
			additionalTextColor: "#838383",
			darkBgTextColor: "#FFFFFF",
			accentBgTextColor: "#FFFFFF",
			textColor: "#210F19",
			itemBackground: "#F2F2F2",
			screenBackgroundColor: "#FFFFFF",
			successColor: "#65C691",
		},
		theme: "light",
	},
}

export default [
	{
		template: 1,
		colors: {
			$accent: "#F53E75",
			$additionalColor: "#838383",
			$additionalTextColor: "#838383",
			$darkBgTextColor: "#FFFFFF",
			$accentBgTextColor: "#FFFFFF",
			$textColor: "#210F19",
			$itemBackground: "#F2F2F2",
			$screenBackgroundColor: "#FFFFFF",
			$successColor: "#65C691",
		},
		theme: "light",
	},
	{
		template: 2,
		colors: {
			$accent: "#10B48C",
			$additionalColor: "#838383",
			$additionalTextColor: "#838383",
			$darkBgTextColor: "#FFFFFF",
			$accentBgTextColor: "#FFFFFF",
			$textColor: "#210F19",
			$itemBackground: "#F2F2F2",
			$screenBackgroundColor: "#FFFFFF",
			$successColor: "#65C691",
		},
		theme: "light",
	},
	{
		template: 3,
		colors: {
			$accent: "#9671F2",
			// $accent: "#940129", // university color
			$additionalColor: "#838383",
			$additionalTextColor: "#838383",
			$darkBgTextColor: "#FFFFFF",
			$accentBgTextColor: "#FFFFFF",
			$textColor: "#210F19",
			$itemBackground: "#F2F2F2",
			$screenBackgroundColor: "#FFFFFF",
			$successColor: "#65C691",
		},
		theme: "light",
	},
	{
		template: 4,
		colors: {
			$accent: '#22D8A1',
			$additionalTextColor: '#777777',
			$additionalColor: '#777777',
			$textColor: '#FFFFFF',
			$darkBgTextColor: "#FFFFFF",
			$itemBackground: "#242424",
			$screenBackgroundColor: '#0B0B0B',
			$successColor: '#65C691',
			$accentBgTextColor: "#0B0B0B",
		},
		theme: "dark",
	},
]
