export default function BizottsagokPage() {
  const committees = [
    {
      name: "Pénzügyi bizottság",
      icon: "bi bi-cash-coin",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      members: [
        { name: "Bakó Attila", role: "bizottság elnöke" },
        { name: "Kócsi Norbert", role: "bizottsági tag" },
        { name: "Somlyai Ádám", role: "bizottsági tag" },
      ],
    },
    {
      name: "Egészségügyi és Szociális bizottság",
      icon: "bi bi-heart-pulse-fill",
      iconColor: "text-red-600 dark:text-red-400",
      members: [
        { name: "Pálócziné Belényesi Enikő", role: "bizottság elnöke" },
        { name: "Kerezsi Józsefné", role: "bizottsági tag" },
        { name: "Feka János", role: "külsős tag" },
      ],
    },
  ];

  return (
    <div className="mt-10 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Bizottságok
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Tyukod Nagyközség Önkormányzatának bizottságai
          </p>
        </div>

        <div className="space-y-12">
          {committees.map((committee, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <i
                  className={`${committee.icon} mr-3 text-2xl ${committee.iconColor}`}
                ></i>
                {committee.name}
              </h2>
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {committee.members.map((member, mIndex) => (
                    <li key={mIndex} className="p-5 flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <i className="bi bi-person-circle text-4xl text-gray-400 dark:text-gray-500"></i>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </p>
                        <p className="text-md text-gray-600 dark:text-gray-400">
                          {member.role}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
