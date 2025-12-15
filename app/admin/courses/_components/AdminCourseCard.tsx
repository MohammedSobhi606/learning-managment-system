import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AdminCourseType } from "../coursesActions/actions";
import { useURL } from "@/hooks/use-constructIURL";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  PencilIcon,
  School,
  TimerIcon,
  Trash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";

interface Props {
  data: AdminCourseType;
}
export default function AdminCourseCard({ data }: Props) {
  const imageURL = useURL(data.fileKey);
  return (
    <>
      <Card className="group relative py-0 gap-y-0">
        {/* dropdown */}
        <div className="absolute right-4 top-4 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"secondary"}>
                <IconDotsVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href={`/admin/courses/${data.id}/edit`}>
                  <PencilIcon className="size-4 mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/courses/${data.slug}`}>
                  <Eye className="size-4 mr-2" />
                  Preview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/admin/courses/${data.id}/edit`}>
                  <Trash className="size-4 mr-2 text-destructive" />
                  Delete Course
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Image
          src={imageURL}
          alt={data.title}
          width={400}
          height={600}
          className="w-full rounded-t-lg aspect-video h-full object-cover"
        />
        <CardContent className="p-4">
          <Link
            href={`/admin/courses/${data.id}/edit`}
            className="font-medium text-lg line-clamp-2 hover:underline hover:text-primary transition-colors"
          >
            {data.title}
          </Link>
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground leading-tight  ">
            {data.smaleDescription}
          </p>
          <div className="flex gap-x-7 items-center mt-5">
            {/* duration */}
            <div className="flex items-center gap-2">
              <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
              <span className="text-muted-foreground text-sm">
                {data.duration}h
              </span>
            </div>
            <div className="flex items-center gap-2">
              <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
              <span className="text-muted-foreground text-sm">
                {data.level}
              </span>
            </div>
          </div>
          <Link
            href={`/admin/courses/${data.id}/edit`}
            className={cn(
              buttonVariants({
                className: "w-full mt-4",
              })
            )}
          >
            Edit Course <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
