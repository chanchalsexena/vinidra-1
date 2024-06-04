import { useState } from "react";
import {
  Container,
  FormLabel,
  Heading,
  VStack,
  Button,
  Input,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/action/userAction";
import { useAuth0 } from "@auth0/auth0-react";
import PageTitle from "../../PageTitle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const showPassword = () => setShow(!show);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setEmail("");
    setPassword("");
  };

  // const LoginButton = () => {
  //     const { loginWithRedirect } = useAuth0();
  //     return <button onClick={() => loginWithRedirect()}>Log In</button>;
  //   };

  const { user, loginWithRedirect, isAuthenticated, logout, isLoading } =
    useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("Current User", user);

  return (
    <>
      <PageTitle title="Login" />
      <Container height="95vh">
        <VStack height="full" justifyContent="center" spacing="16">
          <Heading>Welcome to Vinidra Exam</Heading>
          {isAuthenticated && (
            <div>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          )}
          <form style={{ width: "100%" }} onSubmit={onSubmit}>
            <Box my="4">
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focusBorderColor="yellow.500"
                onFocus={(e) => e.target.setAttribute("autocomplete", "off")}
              />
            </Box>
            <Box my="4">
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  focusBorderColor="yellow.500"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={showPassword}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box>
              <Link to="/forget-password">
                <Button variant="link" fontSize="sm">
                  Forgot Password ?
                </Button>
              </Link>
            </Box>

            {isAuthenticated && <h2>Hello {user.name}</h2>}

            <Button
              type="submit"
              colorScheme="yellow"
              mt="4"
              borderRadius={8}
              size="sm"
            >
              Login
            </Button>

            {isAuthenticated ? (
              <Button
                mt="4"
                size="sm"
                marginLeft="4"
                colorScheme="yellow"
                onClick={() => logout()}
              >
                Logout
              </Button>
            ) : (
              <Button
                mt="4"
                size="sm"
                marginLeft="4"
                colorScheme="yellow"
                onClick={() => loginWithRedirect()}
              >
                Login with Google
              </Button>
            )}

            <Box my="4">
              New User ?{" "}
              <Link to="/register">
                <Button variant="link" fontSize="sm">
                  Sign Up
                </Button>{" "}
                here{" "}
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
