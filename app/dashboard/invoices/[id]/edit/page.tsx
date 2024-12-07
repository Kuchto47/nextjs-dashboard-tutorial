import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>
}
 
export default async function Page(props: Props) {
    const editId = (await props.params).id;

    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(editId),
        fetchCustomers(),
    ]);

    if (!invoice) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
            breadcrumbs={[
                { label: 'Invoices', href: '/dashboard/invoices' },
                {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${editId}/edit`,
                active: true,
                },
            ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
}