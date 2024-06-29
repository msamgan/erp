import PrimaryButton from "@/Components/PrimaryButton.jsx"

export default function DrawerButton({ title, dataObject, setData, openDrawer, setOpenDrawer }) {
    return (
        <PrimaryButton
            className={"h-8"}
            title={title}
            onClick={() => {
                setData(dataObject)
                setOpenDrawer(!openDrawer)
            }}
        >
            {title}
        </PrimaryButton>
    )
}
