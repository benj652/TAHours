import ColbyText from "../../assets/colbytext.svg";
import ColbySeal from "../../assets/colbyseal.svg";
import { GoogleLogin } from "@react-oauth/google";
import { useLogin } from "@/hooks";

export const Login = () => {
    const { login, error, setError } = useLogin();
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="card bg-base-300 rounded-box flex flex-col items-center p-8 space-y-10">
                <div className="flex flex-col lg:flex-row">
                    <img src={ColbySeal} alt="Colby Seal" className="h-100 w-100" />
                    <img src={ColbyText} alt="Colby Seal" className="h-100 w-100" />
                </div>
                <h1 className="text-primary text-4xl">TA Hours</h1>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        login(credentialResponse);
                    }}
                    onError={() => {
                        setError("Error Logging In With Google");
                        console.log("Error Logging In With Google");
                    }}
                />
                {error && <p className="text-error">{error}</p>}
            </div>
        </div>
    );
};
