"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { AdminSingleCourseType } from "../../../coursesActions/actions";

interface ComponentProps {
  courseData: AdminSingleCourseType;
}
export default function CourseStructure({ courseData }: ComponentProps) {
  const initialCourseState = courseData.chapters.map((chapter) => {
    return {
      id: chapter.id,
      title: chapter.title,
      position: chapter.position,
      description: chapter.description,
      isOpen: true, // appear lessons or not for the collabsable component
      lessons: chapter.lessons.map((lesson) => {
        return {
          id: lesson.id,
          description: lesson.description,
          position: lesson.position,
          title: lesson.title,
          videoUrl: lesson.videoUrl,
          duration: lesson.duration,
          isFree: lesson.isFree,
        };
      }),
    };
  });
  function Sortable() {
    const [items, setItems] = useState(initialCourseState);

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col border gap-8">
            {items.map((chapter) => (
              <SortableItem
                key={chapter.id}
                id={chapter}
                chapterData={chapter}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );

    function handleDragEnd(event: any) {
      const { active, over } = event;

      if (active.id !== over.id) {
        setItems((items) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  }

  return (
    <div>
      <Sortable />
    </div>
  );
}
