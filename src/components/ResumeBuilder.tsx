import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useResumeStore, type ResumeSection, type SectionKey } from '../store/useResumeStore';

function SortableSectionCard({ section, index }: { section: ResumeSection; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { selectedSection, setSelectedSection } = useResumeStore();

  return (
    <button
      ref={setNodeRef}
      type="button"
      onClick={() => setSelectedSection(section.key)}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selectedSection === section.key
          ? 'border-violet-400 bg-violet-500/10 shadow-lg shadow-violet-500/10'
          : 'border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50/60'
      } ${isDragging ? 'opacity-70' : ''}`}
      style={style}
      {...attributes}
      {...listeners}
      aria-label={`Reorder ${section.label} section`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-violet-500">Section {index + 1}</p>
          <h3 className="text-lg font-semibold text-slate-900">{section.label}</h3>
          <p className="mt-1 text-sm text-slate-500">{section.description}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Drag</span>
      </div>
    </button>
  );
}

export function ResumeBuilder() {
  const { profile, sections, setProfile, reorderSections, selectedSection } = useResumeStore();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const selectedLabel = useMemo(
    () => sections.find((item) => item.key === selectedSection)?.label ?? 'Summary',
    [sections, selectedSection],
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((item) => item.key === active.id);
    const newIndex = sections.findIndex((item) => item.key === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(sections, oldIndex, newIndex);
      reorderSections(oldIndex, newIndex);
      return reordered;
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f5f7ff_45%,_#eef2ff_100%)] text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 lg:px-6 xl:px-8">
        <header className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_20px_45px_-18px_rgba(124,58,237,0.35)] backdrop-blur xl:p-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-500">CV SaaS Studio</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 xl:text-5xl">Premium resume builder foundation</h1>
              <p className="mt-3 max-w-2xl text-slate-600">A modern split-view workspace with typed state, persistent drafts, and drag-and-drop section ordering for the next generation of CV tools.</p>
            </div>
            <div className="rounded-2xl border border-violet-100 bg-violet-50/80 px-4 py-3 text-sm text-violet-700">Auto-save is live via Zustand persistence.</div>
          </div>
        </header>

        <div className="grid flex-1 gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_22px_60px_-28px_rgba(15,23,42,0.4)] backdrop-blur"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-violet-500">Editor</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-950">Section orchestration</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Drag & drop</span>
            </div>

            <label className="mb-3 block text-sm font-medium text-slate-700">Full name</label>
            <input
              className="mb-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              value={profile.fullName}
              onChange={(event) => setProfile({ fullName: event.target.value })}
            />

            <label className="mb-3 block text-sm font-medium text-slate-700">Headline</label>
            <input
              className="mb-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
              value={profile.role}
              onChange={(event) => setProfile({ role: event.target.value })}
            />

            <div className="mb-4 rounded-2xl border border-dashed border-violet-200 bg-violet-50/70 p-4 text-sm text-violet-900">
              <p className="font-semibold">Next milestone</p>
              <p className="mt-1 text-violet-700">Add rich text editing, ATS analytics, and template switching in the next iteration.</p>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={sections.map((item) => item.key)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <SortableSectionCard section={section} index={index} key={section.key} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_22px_60px_-28px_rgba(15,23,42,0.6)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-violet-300">Preview</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">Live CV canvas</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100">{selectedLabel}</span>
            </div>

            <article className="mt-5 rounded-[26px] border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-black/20">
              <p className="text-xs uppercase tracking-[0.35em] text-violet-500">{profile.role}</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{profile.fullName}</h3>
              <p className="mt-2 text-sm text-slate-500">{profile.email} • {profile.phone} • {profile.location}</p>
              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">The selected section is now synced with a persistent store, making it easy to wire in rich editing, ATS scoring, and export tools later.</div>
              <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                {sections.map((item) => (
                  <div key={item.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.28em] text-violet-500">{item.label}</p>
                    <p className="mt-1 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </motion.section>
        </div>
      </section>
    </main>
  );
}
