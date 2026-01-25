import { client } from '@/tina/__generated__/client';
import Image from 'next/image';

type CommitteeMember = {
  name: string;
  role: string;
  image: string | null; // Changed from string | null | undefined
};

export default async function BizottsagokPage() {
  let people: any[] = [];
  if (process.env.NODE_ENV !== 'production') {
    const tinaData = await client.queries.peopleConnection();
    people = tinaData.data.peopleConnection.edges?.map((edge) => edge?.node).filter(Boolean).map(item => ({
      slug: item?._sys.filename || '',
      entry: {
        name: item?.name || '',
        body: item?.body || '',
        position: item?.position,
        committees: item?.committees,
        image: item?.image,
      }
    })) || [];
  }

  const committeesMap = new Map<string, CommitteeMember[]>();

  for (const person of people) {
    const { entry } = person;
    if (entry.committees) {
      for (const committee of entry.committees) {
        if (committee && committee.name && committee.position) {
          if (!committeesMap.has(committee.name)) {
            committeesMap.set(committee.name, []);
          }
          committeesMap.get(committee.name)!.push({
            name: entry.name,
            role: committee.position,
            image: entry.image,
          });
        }
      }
    }
  }

  const committeeMetadata: { [key: string]: { icon: string; iconColor: string } } = {
    "Pénzügyi bizottság": {
      icon: "bi bi-cash-coin",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    "Egészségügyi és Szociális bizottság": {
      icon: "bi bi-heart-pulse-fill",
      iconColor: "text-red-600 dark:text-red-400",
    },
  };

  const defaultMetadata = {
    icon: "bi bi-people-fill",
    iconColor: "text-gray-600 dark:text-gray-400",
  };

  const committees = Array.from(committeesMap.entries()).map(([name, members]) => ({
    name,
    members,
    ...(committeeMetadata[name] || defaultMetadata),
  }));

  const roleOrder: { [key: string]: number } = {
    'elnök': 1,
    'tag': 2,
    'külsős tag': 3,
  };

  committees.forEach(committee => {
    committee.members.sort((a, b) => {
        const roleA = roleOrder[a.role.toLowerCase()] || 99;
        const roleB = roleOrder[b.role.toLowerCase()] || 99;
        if (roleA !== roleB) {
            return roleA - roleB;
        }
        return a.name.localeCompare(b.name);
    });
  });

  committees.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="mt-10 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Bizottságok
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Tyukod Nagyközség Önkormányzatának bizottságai
          </p>
        </div>

        <div className="space-y-16">
          {committees.map((committee) => (
            <div key={committee.name}>
              <div className="flex items-center mb-6">
                <i className={`${committee.icon} ${committee.iconColor} text-3xl mr-4`}></i>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {committee.name}
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                {committee.members.map((member) => (
                  <div
                    key={member.name}
                    className="w-72 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                  >
                    <div className="p-6 text-center">
                      <div className="relative w-28 h-28 mx-auto mb-4">
                        {member.image ? (
                          <Image
                            src={`/images/people/${member.image}`}
                            alt={`Profilkép - ${member.name}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <i className="bi bi-person-fill text-5xl text-gray-400 dark:text-gray-500"></i>
                          </div>
                        )}
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 capitalize">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
