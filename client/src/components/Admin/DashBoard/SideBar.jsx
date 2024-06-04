/* eslint-disable react/prop-types */
import { VStack, useMediaQuery } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import LinkButton from './LinkButton';
import { RiUser3Fill, RiMailAddFill, RiAdminFill } from 'react-icons/ri';
import { FaHome, FaChalkboardTeacher } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { PiStudentBold, PiStudentFill, PiExamFill } from "react-icons/pi";
// import { FaQuestion } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import cursor from '../../../assets/images/cursor.png';
const SideBar = () => {
    const location = useLocation();
    const [isSmallerDevice] = useMediaQuery("(max-width: 768px)");
    const { user } = useSelector(state => state.user);
    const { role } = user;

    const TeacherRoleStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        boxShadow: "0 0 10px 0 blue",
    };
    const AdminRoleStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        boxShadow: "0 0 10px 0 blue",
    }

    return (
        <VStack spacing={8} p={8} zIndex={100} boxShadow={{ base: 'none', md: 'md' }}
            overflowY={"auto"}
            overflowX={"hidden"}
            style={role === "teacher" ? TeacherRoleStyle : AdminRoleStyle }
            css={{
                cursor: `url(${cursor}), auto`,
            }}
        >
            {
                (role === "admin") && (
                    <>
                        <LinkButton url="home" Icon={FaHome}
                            name={isSmallerDevice ? '' : 'Home'}
                            active={location.pathname === '/admin/home'}
                        />
                        <LinkButton url="add-admin" Icon={RiAdminFill} name={isSmallerDevice ? '' : 'Add Admin'} active={location.pathname === '/admin/add-admin'} />
                        <LinkButton url="admins"
                            name={isSmallerDevice ? '' : 'Admins'}
                            Icon={RiUser3Fill} active={location.pathname === '/admin/admins'} />
                        <LinkButton url="add-teacher" Icon={GiTeacher}
                            name={isSmallerDevice ? '' : 'Add Teacher'}
                            active={location.pathname === '/admin/add-teacher'} />
                        <LinkButton url="teachers" Icon={FaChalkboardTeacher}
                            name={isSmallerDevice ? '' : 'Teachers'}
                            active={location.pathname === '/admin/teachers'} />
                        <LinkButton url="add-user" Icon={PiStudentBold}
                            name={isSmallerDevice ? '' : 'Add Student'}
                            active={location.pathname === '/admin/add-user'} />
                        <LinkButton url="users" Icon={PiStudentFill}
                            name={isSmallerDevice ? '' : 'Students'}
                            active={location.pathname === '/admin/users'} />
                        <LinkButton url="send-email" Icon={RiMailAddFill}
                            name={isSmallerDevice ? '' : 'Send Email'}
                            colorScheme="yellow"
                            active={location.pathname === '/admin/send-email'} />
                        <LinkButton url="create-exam" Icon={PiExamFill}
                            name={isSmallerDevice ? '' : 'Create Exams'}
                            active={location.pathname === '/admin/create-exam'} />
                        <LinkButton url="exams" Icon={PiExamFill}
                            name={isSmallerDevice ? '' : 'Exams'}
                            active={location.pathname === '/admin/exams'} />
                        {/* <LinkButton url="faq" Icon={FaQuestion}
                            name={isSmallerDevice ? '' : 'FAQ'}
                            active={location.pathname === '/admin/faq'} /> */}
                        
                    </>
                )
            }
            {
                (role === "teacher") && (
                    <>
                        <LinkButton url="add-user" Icon={PiStudentBold}
                            name={isSmallerDevice ? '' : 'Add Student'}
                            active={location.pathname === '/admin/add-user'} />
                        <LinkButton url="users" Icon={PiStudentFill}
                            name={isSmallerDevice ? '' : 'Students'}
                            active={location.pathname === '/admin/users'} />
                        <LinkButton url="send-email" Icon={RiMailAddFill}
                            name={isSmallerDevice ? '' : 'Send Email'}
                            colorScheme="yellow"
                            active={location.pathname === '/admin/send-email'} />
                        <LinkButton url="create-exam" Icon={PiExamFill}
                            name={isSmallerDevice ? '' : 'Create Exams'}
                            active={location.pathname === '/admin/create-exam'} />
                        <LinkButton url="exams" Icon={PiExamFill}
                            name={isSmallerDevice ? '' : 'Exams'}
                            active={location.pathname === '/admin/exams'} />
                    </>
                )
            }
        </VStack >
    );
};

export default SideBar;
