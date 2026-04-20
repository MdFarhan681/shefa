export default function IncomingCall({ call, onAccept, onReject }) {
  return (
    <div className="fixed bottom-5 right-5 bg-white p-5 rounded-xl shadow-xl">
      <h2 className="font-bold text-lg">
        📞 {call.name} is calling...
      </h2>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onAccept}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Accept
        </button>

        <button
          onClick={onReject}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Reject
        </button>
      </div>
    </div>
  );
}