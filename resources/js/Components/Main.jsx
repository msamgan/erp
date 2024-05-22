export default function Main({children, className = ''}) {
    return (
        <div className="py-12">
            <div className={'container mx-auto sm:px-6 lg:px-8 ' + className}>
                {children}
            </div>
        </div>
    );
}
