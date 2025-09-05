import { ExclamationTriangleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';



export default function emergency() {

    const emergencyContacts = [
        { name: "Police", number: "100", description: "Emergency police assistance" },
        { name: "Ambulance", number: "108", description: "Medical emergency services" },
        { name: "Fire Brigade", number: "101", description: "Fire and rescue services" },
        { name: "Women Helpline", number: "1091", description: "Women safety and support" },
        { name: "Child Helpline", number: "1098", description: "Child protection services" },
        { name: "Tourist Police", number: "+91-651-2200002", description: "Tourist-specific assistance" }
    ];

    return (
        <section className='mt-12'>
            <div className="space-y-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Emergency Contacts
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Important numbers for emergency situations
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {emergencyContacts.map((contact, index) => (
                        <div
                            key={index}
                            className="glass-cont rounded-xl p-6 text-center hover:bg-gray-800/30 transition-all duration-300 border border-gray-700/50"
                        >
                            <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-red-500/30">
                                <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
                            </div>
                            <h3 className="font-semibold text-white mb-2">
                                {contact.name}
                            </h3>
                            <p className="text-red-400 font-bold text-xl mb-1">
                                {contact.number}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {contact.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="glass-cont rounded-xl p-8 border border-gray-700/50">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                        Safety Tips
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <ShieldCheckIcon className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-white">Keep Emergency Numbers Handy</h4>
                                    <p className="text-gray-400 text-sm">Save these numbers in your phone contacts</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <ShieldCheckIcon className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-white">Share Your Location</h4>
                                    <p className="text-gray-400 text-sm">Let someone know where you&apos;re going</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <ShieldCheckIcon className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-white">Carry ID Documents</h4>
                                    <p className="text-gray-400 text-sm">Keep copies of important documents</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <ShieldCheckIcon className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-white">Stay Connected</h4>
                                    <p className="text-gray-400 text-sm">Ensure your phone is charged and has network</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}