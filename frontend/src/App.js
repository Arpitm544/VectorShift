import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { submitPipeline } from './submit'; 

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
     
     <div className='flex justify-center'>
      <button
        onClick={submitPipeline}             
        className="px-4 py-2 bg-blue-600 text-white rounded shadow "
      >
        Submit
      </button>
      </div>
    </div>
  );
}

export default App;