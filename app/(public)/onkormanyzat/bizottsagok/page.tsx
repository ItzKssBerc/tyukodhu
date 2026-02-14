import { client } from "@/sanity/lib/client";
import { SZEMELY_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from 'next/image';
import EmptyState from "@/components/EmptyState";

type CommitteeMember = {
  name: string;
  role: string;
  image: string | null;
};

// Define the type for the Sanity response item
type SanityPerson = {
  _id: string;
  nev: string;
  titulus?: string;
  // The 'any' type for 'kep' is already suppressed as per the original code.
  // If a more specific type is known, it should replace 'any'.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kep?: any;
  kategoria?: string[];
  bizottsagok?: {
    nev: string;
    pozicio: string;
  }[];
};

export default async function BizottsagokPage() {
  // Fetch data from Sanity
  const people = await client.fetch<SanityPerson[]>(SZEMELY_QUERY);

  const committeesMap = new Map<string, CommitteeMember[]>();

  for (const person of people) {
    if (person.bizottsagok) {
      for (const committee of person.bizottsagok) {
        if (committee && committee.nev && committee.pozicio) {
          if (!committeesMap.has(committee.nev)) {
            committeesMap.set(committee.nev, []);
          }

          let imageUrl = null;
          if (person.kep) {
            try {
              imageUrl = urlFor(person.kep).url();
            } catch (e) {
              console.error("Error generating image URL for person:", person.nev, e);
            }
          }

          committeesMap.get(committee.nev)!.push({
            name: person.nev,
            role: committee.pozicio,
            image: imageUrl,
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
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden theme-transition bg-transparent">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-red-600/10 dark:bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-indigo-600/10 dark:bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-red-100/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 dark:text-red-400 font-orbitron">
              Helyi Irányítás
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter font-orbitron mb-6">
            BIZOTTSÁGOK
            <span className="block h-1.5 w-24 bg-gradient-to-r from-red-600 to-indigo-600 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            Tyukod Nagyközség Önkormányzatának szakmai döntés-előkészítő és ellenőrző testületei, melyek segítik a képviselő-testület munkáját.
          </p>
        </div>

        <div className="space-y-32 max-w-6xl mx-auto">
          {committees.length === 0 ? (
            <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-xl border border-stone-200 dark:border-stone-800 rounded-[3rem] p-16">
              <EmptyState
                title="Nincsenek elérhető bizottságok"
                description="Jelenleg nincs megjeleníthető bizottsági adat a rendszerben. Kérjük, látogasson vissza később!"
                icon="bi-people"
              />
            </div>
          ) : (
            <>
              {committees.map((committee) => (
                <section key={committee.name} className="relative group">
                  <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-6">
                    <div className="flex items-center gap-6">
                      <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-stone-900 shadow-xl border border-stone-100 dark:border-stone-800 transform group-hover:scale-110 transition-transform duration-500`}>
                        <i className={`${committee.icon} ${committee.iconColor} text-3xl`}></i>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-orbitron tracking-tight">
                          {committee.name}
                        </h2>
                        <div className="h-1 w-full bg-stone-200 dark:bg-stone-800 mt-2 rounded-full overflow-hidden">
                          <div className={`h-full w-1/3 ${committee.iconColor.replace('text-', 'bg-')} bg-current opacity-50`}></div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 text-sm font-bold text-stone-500 dark:text-stone-400 font-orbitron uppercase tracking-widest">
                      {committee.members.length} TAG
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {committee.members.map((member) => (
                      <div
                        key={member.name + member.role}
                        className="group/card relative"
                      >
                        {/* Shadow/Glow effect on hover */}
                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-red-600/20 to-indigo-600/20 rounded-3xl blur opacity-0 group-hover/card:opacity-100 transition duration-500`}></div>

                        <div className="relative bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl border border-white/20 dark:border-stone-800 rounded-3xl p-8 h-full flex flex-col items-center text-center hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-300">
                          <div className="relative p-1 rounded-2xl bg-gradient-to-b from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-800 mb-6 shadow-lg group-hover/card:shadow-red-500/10 transition-shadow duration-500">
                            <div className="relative w-24 h-24 overflow-hidden rounded-xl bg-stone-50 dark:bg-stone-800">
                              {member.image ? (
                                <Image
                                  src={member.image}
                                  alt={`Profilkép - ${member.name}`}
                                  fill
                                  className="object-cover transform group-hover/card:scale-110 transition-transform duration-700"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-300 dark:text-stone-600">
                                  <i className="bi bi-person-fill text-5xl"></i>
                                </div>
                              )}
                            </div>
                            {/* Role indicator dot */}
                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white dark:border-stone-900 ${member.role.toLowerCase().includes('elnök') ? 'bg-red-500' : 'bg-green-500'
                              }`}></div>
                          </div>

                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                            {member.name}
                          </h4>

                          <div className="mt-auto pt-4 flex flex-col items-center">
                            <span className="px-3 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 group-hover/card:bg-red-500/10 text-stone-500 dark:text-stone-400 group-hover/card:text-red-600 dark:group-hover/card:text-red-400 text-xs font-bold uppercase tracking-widest transition-colors duration-300">
                              {member.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

