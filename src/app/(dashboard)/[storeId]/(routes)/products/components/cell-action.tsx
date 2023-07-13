"use client";
import { Edit, MoreHorizontal } from "lucide-react";
import { Copy } from "lucide-react";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ProductCoulmn } from "./columns";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionProps {
  data: ProductCoulmn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Product id copied.");
  };
  const onUpdate = () => {
    router.push(`/${params.storeId}/products/${data.id}`);
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${data.id}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Billboard Deleted.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong , please try agian later.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        loading={isLoading}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUpdate}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
            className="bg-red-600 text-white focus:bg-accent focus:bg-red-600 focus:text-white"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
