import PrimaryButton from "@/Components/PrimaryButton.jsx"

export default function DrawerButton({ title, onClick }) {
    return (
        <PrimaryButton className={"h-8"} title={title} onClick={onClick}>
            {title}
        </PrimaryButton>
    )
}
