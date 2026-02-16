import nextConfig from "eslint-config-next"

const config = [
	{
		ignores: ["components/PackageCard.jsx", "components/packages/package-gallery.tsx"],
	},
	...nextConfig,
	{
		rules: {
			"react-hooks/set-state-in-effect": "off",
		},
	},
]

export default config
