"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddNewBankAccount() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      console.log("Form submitted");
      router.push("/account/bank-accounts");
      setStep(1);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Left side content */}
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-light mb-4">Gerencie suas</h1>
        <h2 className="text-4xl font-light mb-2">movimentações e resgates</h2>
        <h3 className="text-4xl font-medium mb-8">com a Carteira COnectaPay</h3>
        <Button
          onClick={() => setStep(1)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-fit px-8 py-6 text-lg transition-all duration-300"
        >
          COMEÇAR AGORA
        </Button>
      </div>

      {/* Right side form */}
      <div className="w-1/2 bg-white p-12 shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            {/* Step indicator */}
            <div className="flex items-center mb-8">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div
                  className={`h-full ${step === 2 ? "bg-indigo-600" : ""} transition-all duration-500`}
                  style={{ width: step === 2 ? "100%" : "0%" }}
                ></div>
              </div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === 2 ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                <div className="bg-indigo-50 p-6 rounded-lg mb-8">
                  <h2 className="text-lg font-medium mb-2">Informe os dados pessoais vinculado a sua conta bancária</h2>
                  <p className="text-sm text-gray-600">
                    Os dados cadastrados devem pertencer ao titular da conta bancária
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium mb-1 block">Adicione informações Bancária</span>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Nacional" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nacional">Nacional</SelectItem>
                        <SelectItem value="internacional">Internacional</SelectItem>
                      </SelectContent>
                    </Select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium mb-1 block">Nome do Titular</span>
                    <Input placeholder="ex. festival de verão" className="w-full" />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium mb-1 block">IBAN</span>
                    <Input placeholder="ex. AC06 XXXX XXXX XXXX XXXX" className="w-full" />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium mb-1 block">Banco</span>
                    <Input placeholder="ex. AC06 XXXX XXXX XXXX XXXX" className="w-full" />
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-indigo-50 p-6 rounded-lg mb-8">
                  <h2 className="text-lg font-medium mb-2">
                    Para garantir a segurança da sua carteira adicione o seu email
                  </h2>
                  <p className="text-sm text-gray-600">
                    Os dados cadastrados devem pertencer ao titular da conta bancária
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium mb-1 block">E-mail</span>
                    <Input placeholder="ex. qwefanicekbtj@gmail.com" className="w-full" />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium mb-1 block">Bi</span>
                    <Input placeholder="ex. 002584955958AD45" className="w-full" />
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-8">
              {step === 2 && (
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="px-8">
                  Cancelar
                </Button>
              )}
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                {step === 1 ? "Próximo" : "Criar"}
              </Button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
