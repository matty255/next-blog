import Link from "next/link";



export default function Custom404()  {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl mb-4">페이지를 찾을 수 없습니다.</p>
        <p className="mb-8">요청하신 페이지는 존재하지 않거나, 이동되었을 수 있습니다.</p>
        <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

