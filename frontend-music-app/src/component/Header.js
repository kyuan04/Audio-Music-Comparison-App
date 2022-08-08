import { Button } from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import Login from "../component/LoginButton";
import Logout from "../component/LogoutButton";

export default function Header() {
    console.log("header called")
    const { isAuthenticated } = useAuth0();

    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            {/*  */}
            {isAuthenticated ? (
                <>
                    <div>
                        <Button
                            id="btnUpload"
                            className="btn margin"
                            variant="primary"
                        >
                            Upload Song
                        </Button>
                        &nbsp;&nbsp;
                        <Logout />
                    </div>
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}