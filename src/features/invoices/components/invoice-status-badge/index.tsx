import { Badge } from "@/components/ui/badge";
import { InvoiceStatus } from "@/types/invoice.types";


const InvoiceStatusBadge = ({ status }: { status: InvoiceStatus }) => {
    const badgeColors = {
        [InvoiceStatus.PAID]: "outline",
        [InvoiceStatus.PENDING]: "secondary",
        [InvoiceStatus.OVERDUE]: "destructive",
    };

    const badgeColor = badgeColors[status] || "default";

    return (
        <Badge variant={badgeColor}>
            {status}
        </Badge>
    );
};

export default InvoiceStatusBadge;
