import './App.css'
import FolderContainer from './components/FolderContainer'
import { FoldersProvider } from './store/folders-context'

function App() {
  return (
    <FoldersProvider>
      <main className='p-8 h-screen flex bg-zinc-950 font-inter text-zinc-700'>
        <FolderContainer />
      </main>
    </FoldersProvider>
  )
}

export default App
