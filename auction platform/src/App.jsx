import './App.css';
import './index.css';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Hello everyone 👋</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Welcome to my Tailwind CSS powered React app. Let's build something amazing together!
      </p>
      <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
        Click Me 🚀
      </button>
      <div className="mt-8 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Why Tailwind CSS?</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Utility-first approach</li>
          <li>Highly customizable</li>
          <li>Faster styling process</li>
          <li>Responsive design made easy</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
