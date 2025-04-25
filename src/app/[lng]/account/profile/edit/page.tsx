"use client";

import { updateProfile } from "@/actions/account";
import AuthHeader from "@/components/authHeader";
import Footer from "@/components/footer";
import { WrapperContent } from "@/containers/WrapperContent";
import { home, photogallery, user } from "@/images";
import Image from "next/image";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export default function EditProfile() {
  const [state, action] = useFormState(updateProfile, undefined);
  const { pending } = useFormStatus();

  return (
    <>
      <AuthHeader />

      <WrapperContent>
        <div className="flex gap-4">
          <Link href="/" className="text-gray-600 flex gap-2 items-center">
            <Image src={home} alt={""} width={16} height={16} />
            Página Inicial
          </Link>

          <Link href="/" className="text-gray-600 flex gap-1 items-center">
            <Image src={user} alt={""} width={16} height={16} />
            Perfil
          </Link>

          <Link href="/" className="text-gray-600">
            Editar
          </Link>
        </div>

        <div className="flex lg:mb-8">
          <div className="my-4 h-full w-full rounded-2xl bg-purple text-white p-5 shadow-xl">
            <h1 className="text-2xl">Editar Perfil</h1>
          </div>
        </div>

        <div className="lg:my-4 flex w-full">
          <form action={action} className="flex flex-col lg:gap-24 gap-8 w-full">
            <div className="flex max-lg:flex-col gap-12 w-full">
              <div className="flex lg:w-1/2 lg:max-w-64 h-64">
                <label
                  htmlFor="profile-photo"
                  className="flex aspect-square rounded-lg h-60 w-full items-center justify-center bg-gray-500/20"
                >
                  <Image src={photogallery} width={32} height={32} alt="Profile Photo Label Icon" />
                </label>
                <input type="file" name="profile-photo" id="profile-photo" className="hidden h-14" />
              </div>

              <div className="flex flex-wrap lg:w-2/3 justify-between gap-4">
                <div className="form-control w-full max-w-md">
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    placeholder="Nome completo"
                    className="w-full py-2 px-4 border border-gray-400 rounded-lg outline-none "
                  />
                  {state?.errors?.name && <p className="text-destructive text-sm">{state.errors.name}</p>}
                </div>

                <div className="form-control w-full max-w-md">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Digite o seu email"
                    className="w-full py-2 px-4 border border-gray-400 rounded-lg outline-none "
                  />
                  {state?.errors?.email && <p className="text-destructive text-sm">{state.errors.email}</p>}
                </div>

                <div className="form-control w-full max-w-md">
                  <input
                    type="tel"
                    name="telephone"
                    id="telephone"
                    placeholder="Digite o seu contacto telefónico"
                    className="w-full py-2 px-4 border border-gray-400 rounded-lg outline-none "
                  />
                  {state?.errors?.phone && <p className="text-destructive text-sm">{state.errors.phone}</p>}
                </div>

                <div className="form-control w-full max-w-md">
                  <div className="w-full py-2 px-4 border border-gray-400 rounded-lg outline-none">
                    <select
                      name="gender"
                      id="gender"
                      aria-label="Selecione seu gênero"
                      className="w-full outline-none text-gray-400"
                    >
                      <option value="">Selecione seu gênero</option>
                      <option value="male"> Masculino </option>
                      <option value="female"> Feminino </option>
                    </select>
                  </div>
                  {state?.errors?.gender && <p className="text-destructive text-sm">{state.errors.gender}</p>}
                </div>

                <div className="form-control w-full max-w-md">
                  <input
                    type="datetime"
                    name="born-date"
                    id="born-date"
                    placeholder="Data de nascimento"
                    className="w-full py-2 px-4 border border-gray-400 rounded-lg outline-none "
                  />
                  {state?.errors?.bornDate && <p className="text-destructive text-sm">{state.errors.bornDate}</p>}
                </div>
              </div>
            </div>

            <div className="form-control w-full">
              <textarea
                name="biography"
                id="biography"
                placeholder="Descreva sobre você"
                className="bg-gray-200 rounded-lg w-full border border-primary px-5 py-4 outline-none"
                rows={8}
              ></textarea>
              {state?.errors?.bio && <p className="text-destructive text-sm">{state.errors.bio}</p>}
            </div>

            <button className="form-button py-4" type="submit" disabled={pending}>
              Gravar
            </button>
          </form>
        </div>
      </WrapperContent>

      <Footer />
    </>
  );
}
