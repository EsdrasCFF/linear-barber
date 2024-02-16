"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'
import { useRouter } from "next/navigation";

const searchFormSchema = z.object({
  search: z.string({required_error: 'Campo obrigatório!'})
    .min(1, 'Campo obrigatório!')
    .transform(search => search.toLocaleLowerCase() )
})

type SearchFormData = z.infer<typeof searchFormSchema>

interface SearchProps {
  defaultValues?: {
    search: string | undefined
  }
}

export function Search({defaultValues}: SearchProps){

  const router = useRouter()

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: defaultValues,
  })

  function handleFormSubmit(data: SearchFormData){
    const {search} = data;
    
    router.push(`/barbershops?search=${search}`)
  }

  return(
    <form className="flex flex-col"onSubmit={handleSubmit(handleFormSubmit)}> 
      <div className="flex items-center gap-2">
        <Input placeholder="Busque por uma barbearia" {...register('search')}/>
        
        <Button size="icon" variant="default" type="submit"> <SearchIcon size={18} /> </Button>
      </div>

      {errors.search && (
        <p className="text-[10px] text-red-500 pt-2 " > {errors.search.message} </p>
      )}
    </form>
  )
}