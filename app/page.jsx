export const metadata = {
	keywords: ["fashion", "cloths", "apparels", "latest fashion cloths", "affordable cloths"], // keywords that will used by search engines to rank the site
	openGraph: {
        title: "E-commerce store: shop the latest trends",
        description: "Shop the latest trendy fashions clothes at an afforable price",
        url: process.env.NEXT_PUBLIC_BASE_URL,
        images: [
            {
                url: '',
                width: 800,
                height: 600,
                alt: "E-commerce store: shop trendy cloths at afforable price"
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',            // Shows a large image card
        site: '@',                     // Twitter handle of the website or business
        title: 'E-commerce store: shop the latest trends',  
        description: 'Shop the latest trendy fashions clothes at an afforable price', 
        images: [''], // URL of the image to display
    }
}

const HomePage = () => {
	return (
		<div>
			<h1>home page</h1>
		</div>
	)
}

export default HomePage;