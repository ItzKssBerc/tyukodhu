export default function KepviseloTestuletPage() {
  const members = [
    {
      name: "Kajdi Szabolcs",
      role: "polgármester",
      icon: "bi bi-star-fill",
      iconColor: "text-yellow-500",
    },
    {
      name: "Bíró Sándor",
      role: "alpolgármester",
      icon: "bi bi-star-half",
      iconColor: "text-yellow-400",
    },
    {
      name: "Bakó Attila",
      role: "képviselő",
      icon: "bi bi-person-fill",
      iconColor: "text-gray-400 dark:text-gray-500",
    },
    {
      name: "Kerezsi Józsefné",
      role: "képviselő",
      icon: "bi bi-person-fill",
      iconColor: "text-gray-400 dark:text-gray-500",
    },
    {
      name: "Kócsi Norbert",
      role: "képviselő",
      icon: "bi bi-person-fill",
      iconColor: "text-gray-400 dark:text-gray-500",
    },
    {
      name: "Pálócziné Belényesi Enikő",
      role: "képviselő",
      icon: "bi bi-person-fill",
      iconColor: "text-gray-400 dark:text-gray-500",
    },
    {
      name: "Somlyai Ádám",
      role: "képviselő",
      icon: "bi bi-person-fill",
      iconColor: "text-gray-400 dark:text-gray-500",
    },
  ];

  return (
    <div className="container mt-10 mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        A Képviselő-testület tagjai
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
          >
            <div className={`text-3xl mb-4 ${member.iconColor}`}>
              <i className={member.icon}></i>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              {member.name}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
