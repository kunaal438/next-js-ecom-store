export const generateMetadata = async ({ params }) => {

    const { route } = params;

    const title = route == "login" ? "Log in to your account" : "Create your account today";

    return { title };

}

const AuthPageLayoutForSEO = ({ children }) => {

    return (
        <div>
            {children}
        </div>
    )
    
}

export default AuthPageLayoutForSEO;