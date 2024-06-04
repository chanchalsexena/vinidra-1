/* eslint-disable react/prop-types */
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion";
const Accordian = ({ data }) => {
    return (
        <Box as="section" className="faq" py={16}>
            <Box maxW="container.xl" mx="auto" px={{ base: 4, md: 8 }}>
                <Accordion allowToggle>
                    <AnimatePresence>
                        {data?.map((faq) => (
                            <motion.div key={faq._id} layout>
                                <AccordionItem border="none" mb={4}>
                                    <h2>
                                        <AccordionButton py={4}>
                                            <Box flex="1" textAlign="left">
                                                {faq.question}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} textAlign="left">
                                        {faq.answer}
                                    </AccordionPanel>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Accordion>
            </Box>
        </Box>
    )
}

export default Accordian;
