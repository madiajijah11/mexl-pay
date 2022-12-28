import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

function IsLogin(Component) {
  return function IsLoginComponent(props) {
    const { token } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.replace("/login");
      }
    }, [token, router]);

    if (token) {
      return <Component {...props} />;
    }
  };
}

export default IsLogin;
