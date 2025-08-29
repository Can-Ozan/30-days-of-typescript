import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { NoteList } from '@/components/NoteList';
import { NoteEditor } from '@/components/NoteEditor';

export default function Index() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <div className="flex gap-6 h-[calc(100vh-200px)]">
          <Sidebar />
          
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="overflow-y-auto">
              <NoteList />
            </div>
            
            <div className="overflow-y-auto">
              <NoteEditor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
