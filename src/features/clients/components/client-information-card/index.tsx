import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/currency-formatter"
import { ClientDto } from "@/types/client.types"
import { Building2, Mail, Phone, FileText, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"

interface ClientInformationCardProps {
    client: ClientDto
}

const ClientInformationCard = ({ client }: ClientInformationCardProps) => {
    const [totalInvoiceAmount, setInvoiceAmount] = useState("");
    const [totalInvoices, setTotalInvoices] = useState(0);

    useEffect(() => {
        if (client?.invoices) {
            const totalAmount = formatCurrency(client.invoices.reduce((sum, invoice) => sum + (invoice?.totalAmount ?? 0), 0));
            setInvoiceAmount(totalAmount);
            setTotalInvoices(client.invoices.length);
        }
    }, [client?.invoices]);

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Company</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{client?.clientName}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contact</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    <div className="text-sm">{client?.clientEmail}</div>
                    <div className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {client?.clientPhone}
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalInvoices}</div>
                <p className="text-xs text-muted-foreground">
                    +2 from last month
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalInvoiceAmount}</div>
                <p className="text-xs text-muted-foreground">
                    +15% from last month
                </p>
            </CardContent>
        </Card>
    </div>
}

export default ClientInformationCard;