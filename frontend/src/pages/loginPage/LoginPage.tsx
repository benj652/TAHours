import ColbyText from "../../assets/colbytext.svg";
import ColbySeal from "../../assets/colbyseal.svg";

export const Login = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="card bg-base-300 rounded-box flex flex-col items-center p-8 space-y-10">
        <div className="flex flex-row">
          <img src={ColbySeal} alt="Colby Seal" className="h-100 w-100" />
          <img src={ColbyText} alt="Colby Seal" className="h-100 w-100" />
        </div>
        <h1 className="text-primary text-4xl">TA Hours</h1>
      </div>
    </div>
  );
};
