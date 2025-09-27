import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClientDto } from "@/types/client.types"
import { MapPin } from "lucide-react";

interface ClientAddressCardProps {
    client: ClientDto
}

const ClientAddressCard = ({ client }: ClientAddressCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address Information
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-medium mb-2">Billing Address</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                            <div>{client?.clientAddress.street}</div>
                            <div>{client?.clientAddress.city}, {client?.clientAddress.postalCode}</div>
                            <div>{client?.clientAddress.country}</div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium mb-2">Shipping Address</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                            <div>Same as billing address</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default ClientAddressCard;