/* eslint-disable react/prop-types */
import { useEffect } from 'react';

const PageTitle = ({ title }) => {
    useEffect(() => {
        document.title = `VinidraExam | ${title}`;

        const setDescriptionMetaTag = () => {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = "VinidraExam is a platform where you can learn and grow. We provide a wide range of courses and exams to help you achieve your goals.";
            document.getElementsByTagName('head')[0].appendChild(meta);
            return meta;
        };

        const setKeywordsMetaTag = () => {
            const meta = document.createElement('meta');
            meta.name = "keywords";
            meta.content = "vinidra,vinidraexam, courses, exams, learn, grow, platform, wide range, achieve, goals";
            document.getElementsByTagName('head')[0].appendChild(meta);
            return meta;
        };

        const descriptionMeta = setDescriptionMetaTag();
        const keywordsMeta = setKeywordsMetaTag();

        return () => {
            document.getElementsByTagName('head')[0].removeChild(descriptionMeta);
            document.getElementsByTagName('head')[0].removeChild(keywordsMeta);
        };
    }, [title]);

    return null;
};

export default PageTitle;
