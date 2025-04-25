"use client";

import AuthHeader from "@/components/authHeader";
import { Button } from "@/components/ui/button";
import { WrapperContent } from "@/containers/WrapperContent";
import { useRouter } from "next/navigation";
import { MdCheckBox } from "react-icons/md";

export default function BankAccount() {
  const router = useRouter();

  return (
    <section className="flex flex-col">
      <AuthHeader />
      <WrapperContent>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-6xl mx-auto p-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-medium">Contas Bancárias</h1>
                <Button
                  onClick={() => router.push("/account/bank-accounts/add")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Adicionar conta bancária
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="p-4 text-left w-12">
                        <MdCheckBox />
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-gray-600">ID</th>
                      <th className="p-4 text-left text-sm font-medium text-gray-600">Banco</th>
                      <th className="p-4 text-left text-sm font-medium text-gray-600">IBAN</th>
                      <th className="p-4 text-left text-sm font-medium text-gray-600">Titular</th>
                      <th className="p-4 text-left text-sm font-medium text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td colSpan={6} className="py-8 text-gray-500">
                        Sem dados Bancários
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </WrapperContent>
    </section>
  );
}
