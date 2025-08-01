interface ContentContainerProps {
    children: React.ReactNode;
}

const ContentContainer = ({ children }: ContentContainerProps) => {
    return (
        <div className="w-full h-full p-4">
            {children}
        </div>
    );
}

export default ContentContainer;