// import React from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  DrawerBody,
  VStack,
  HStack,
  Box,
  Flex,
  Spacer,
  Image,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { RiDashboardFill, RiLoginBoxLine, RiMenu5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { logout as logoutUser } from "../../store/action/userAction";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";

const LinkButton = ({ url = "/", title = "Home", onClose }) => (
  <Link to={url} onClick={onClose}>
    <Button variant="ghost">{title}</Button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    onClose();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Box
      position="relative"
      backgroundColor="themeColor"
      padding="30px"
      borderBottom="1px solid #ddd"
    >
      <ColorModeSwitcher />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        display={{ base: "flex", md: "none" }}
      >
        <Box>
          <Button
            colorScheme="red"
            height={10}
            width={5}
            position="absolute"
            top={8}
            right={10}
            onClick={onOpen}
            zIndex="overlay"
            _hover={{ backgroundColor: "yellow.800" }}
          >
            <RiMenu5Fill />
          </Button>
          <Link to="/">
            <Image
              src="https://res.cloudinary.com/dwddhs9io/image/upload/v1711788528/Vinidra/Vinidralogo.png"
              alt="logo"
              boxSize="50px"
              objectFit="cover"
            />
          </Link>
        </Box>
        <HStack
          spacing={4}
          alignItems="center"
          display={{ base: "none", md: "flex" }}
        >
          <Link to="/">
            <Avatar
              src="https://res.cloudinary.com/dwddhs9io/image/upload/v1711788528/Vinidra/Vinidralogo.png"
              size="sm"
            />
          </Link>
          <Box display={{ base: "none", md: "flex" }}>
            <LinkButton url="/" title="Home" onClose={onClose} />
            {/* <LinkButton url="/courses" title="Browse All Courses" onClose={onClose} /> */}
            {/* <LinkButton url="/exams" title="Browse All Exams" onClose={onClose} /> */}
            {/* <LinkButton url="/request" title="Request a Course" onClose={onClose} /> */}
            <LinkButton url="/contact" title="Contact Us" onClose={onClose} />
            <LinkButton url="/about" title="About" onClose={onClose} />
          </Box>
        </HStack>
        <Box
          display={{ base: "none", md: "flex" }}
          justifyContent="flex-end"
          alignItems="center"
        >
          {isAuthenticated ? (
            <VStack>
              <HStack>
                <Link to="/profile" onClick={onClose}>
                  <Button colorScheme="yellow" variant="ghost">
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" onClick={logout}>
                  <RiLoginBoxLine />
                  Logout
                </Button>
              </HStack>
              {user && (user.role === "admin" || user.role === "teacher") && (
                <Link to="/admin/dashboard" onClick={onClose}>
                  <Button colorScheme="purple" variant="ghost">
                    <RiDashboardFill style={{ margin: "4px" }} />
                    Dashboard
                  </Button>
                </Link>
              )}
            </VStack>
          ) : (
            <>
              <Link to="/login" onClick={onClose}>
                <Button colorScheme="yellow">Login</Button>
              </Link>
              <span> | </span>
              <Link to="/register" onClick={onClose}>
                <Button colorScheme="yellow">Sign Up</Button>
              </Link>
            </>
          )}
        </Box>
      </Flex>
      <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter="blur(10px)" />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Vinidra</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} alignItems="flex-start">
              <Link to="/">
                <Image
                  src="https://res.cloudinary.com/dwddhs9io/image/upload/v1711788528/Vinidra/Vinidralogo.png"
                  alt="logo"
                  boxSize="50px"
                  objectFit="cover"
                />
              </Link>
              <LinkButton url="/" title="Home" onClose={onClose} />
              <LinkButton
                url="/courses"
                title="Browse All Courses"
                onClose={onClose}
              />
              <LinkButton
                url="/exams"
                title="Browse All Exams"
                onClose={onClose}
              />
              <LinkButton
                url="/request"
                title="Request a Course"
                onClose={onClose}
              />
              <LinkButton url="/contact" title="Contact Us" onClose={onClose} />
              <LinkButton url="/about" title="About" onClose={onClose} />
            </VStack>
            <HStack
              justifyContent="space-between"
              position="absolute"
              bottom="2rem"
              width="50%"
            >
              {isAuthenticated ? (
                <VStack>
                  <HStack>
                    <Link to="/profile" onClick={onClose}>
                      <Button colorScheme="yellow" variant="ghost">
                        Profile
                      </Button>
                    </Link>
                    <Button variant="ghost" onClick={logout}>
                      <RiLoginBoxLine />
                      Logout
                    </Button>
                  </HStack>
                  {user &&
                    (user.role === "admin" || user.role === "teacher") && (
                      <Link to="/admin/dashboard" onClick={onClose}>
                        <Button colorScheme="purple" variant="ghost">
                          <RiDashboardFill style={{ margin: "4px" }} />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                </VStack>
              ) : (
                <>
                  <Link to="/login" onClick={onClose}>
                    <Button colorScheme="yellow">Login</Button>
                  </Link>
                  <span> | </span>
                  <Link to="/register" onClick={onClose}>
                    <Button colorScheme="yellow">Sign Up</Button>
                  </Link>
                </>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box display={{ base: "none", md: "block" }}>
        <HStack spacing={4} alignItems="center">
          <Link to="/">
            <Image
              src="https://res.cloudinary.com/dwddhs9io/image/upload/v1711788528/Vinidra/Vinidralogo.png"
              alt="logo"
              boxSize="50px"
              objectFit="cover"
            />
          </Link>
          <HStack spacing={0} alignItems="left">
            <LinkButton url="/" title="Home" onClose={onClose} />
            {/* <LinkButton url="/courses" title="Browse All Courses" onClose={onClose} /> */}
            <LinkButton
              url="/exams"
              title="Browse All Exams"
              onClose={onClose}
            />
            {/* <LinkButton url="/request" title="Request a Course" onClose={onClose} /> */}
            <LinkButton url="/contact" title="Contact Us" onClose={onClose} />
            <LinkButton url="/about" title="About" onClose={onClose} />
          </HStack>
          <Spacer />
          <Box spacing={1} justifyContent="flex-end" alignItems="center">
            {isAuthenticated ? (
              <VStack>
                <HStack>
                  <Link to="/profile" onClick={onClose}>
                    <Button colorScheme="yellow" variant="ghost">
                      Profile
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={logout}>
                    <RiLoginBoxLine />
                    Logout
                  </Button>
                  {user &&
                    (user.role === "admin" || user.role === "teacher") && (
                      <Link to="/admin/dashboard" onClick={onClose}>
                        <Button colorScheme="purple" variant="ghost">
                          <RiDashboardFill style={{ margin: "4px" }} />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                </HStack>
              </VStack>
            ) : (
              <>
                <Link to="/login" onClick={onClose}>
                  <Button colorScheme="yellow">Login</Button>
                </Link>
                {/* <span> | </span>
                                <Link to="/register" onClick={onClose}>
                                    <Button colorScheme="yellow">Sign Up</Button>
                                </Link> */}
              </>
            )}
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;

LinkButton.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};
