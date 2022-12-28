import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

function IsNotLogin(Component) {
  return function IsNotLoginComponent(props) {
    const { token } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (token) {
        router.replace("/home");
      }
    }, [token, router]);

    if (!token) {
      return <Component {...props} />;
    }
  };
}

export default IsNotLogin;
