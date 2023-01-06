import { TailSpin } from "react-loader-spinner";

const Spinner = () => {
    return (
        <center style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <div>
                <TailSpin type="TailSpin" color="#0a66c2" height={80} width={80} />
            </div>
        </center>
    )
}

export default Spinner