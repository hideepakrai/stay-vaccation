import AdminLayoutWrapper from "../../../../components/AdminLayoutWrapper";
import EditDestinationContent from "./EditDestinationContent";

export const metadata = {
  title: "Edit Destination — Admin Panel",
};

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <AdminLayoutWrapper section="locations">
      <EditDestinationContent id={id} />
    </AdminLayoutWrapper>
  );
}
