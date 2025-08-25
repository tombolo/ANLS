'use client';
import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUser,
    FiBook,
    FiDollarSign,
    FiUpload,
    FiDownload,
    FiEdit,
    FiSave,
    FiX,
    FiCalendar,
    FiMail,
    FiPhone,
    FiMapPin,
    FiBookOpen,
    FiAward,
    FiLogOut,
    FiFileText,
    FiPieChart,
    FiCreditCard,
    FiHelpCircle,
    FiSearch,
    FiFilter,
    FiChevronDown,
    FiPlus,
    FiCheckCircle,
    FiAlertCircle,
    FiClock,
    FiMenu,
    FiXCircle
} from 'react-icons/fi';

// Define types for our data
interface Student {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    course: string;
    enrollmentDate: string;
    status: string;
    sponsor?: string;
    studentId: string;
    dateOfBirth: string;
    gender: string;
    avatar?: string;
}

interface Document {
    _id: string;
    name: string;
    type: string;
    uploadDate: string;
    url: string;
    size: string;
}

interface Fee {
    _id: string;
    semester: string;
    amount: number;
    paid: number;
    dueDate: string;
    status: string;
}

export default function StudentPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('profile');
    const [student, setStudent] = useState<Student | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [fees, setFees] = useState<Fee[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedStudent, setEditedStudent] = useState<Student | null>(null);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileType, setFileType] = useState('results');
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);

    // Fetch student data from MongoDB
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                // Mock data for demonstration
                const mockStudent: Student = {
                    _id: '1',
                    name: 'Mary Mwende',
                    email: 'mary.mwende@university.edu',
                    phone: '+254712345678',
                    address: '123 Main Street, Nairobi, Kenya',
                    course: 'Bachelor of Computer Science',
                    enrollmentDate: '2023-09-01',
                    status: 'Active',
                    sponsor: 'ABC Foundation',
                    studentId: 'STU-2023-0875',
                    dateOfBirth: '2002-05-15',
                    gender: 'Female',
                    avatar: '/avatars/student-1.jpg'
                };

                const mockDocuments: Document[] = [
                    {
                        _id: '1',
                        name: 'Semester 1 Examination Results',
                        type: 'results',
                        uploadDate: '2024-01-15',
                        url: '/documents/results.pdf',
                        size: '2.4 MB'
                    },
                    {
                        _id: '2',
                        name: 'Official Academic Transcript',
                        type: 'transcript',
                        uploadDate: '2024-02-20',
                        url: '/documents/transcript.pdf',
                        size: '3.1 MB'
                    },
                    {
                        _id: '3',
                        name: '2024 Fee Structure',
                        type: 'fees',
                        uploadDate: '2024-03-10',
                        url: '/documents/fees.pdf',
                        size: '1.8 MB'
                    },
                    {
                        _id: '4',
                        name: 'Research Project Proposal',
                        type: 'other',
                        uploadDate: '2024-04-05',
                        url: '/documents/proposal.pdf',
                        size: '5.2 MB'
                    }
                ];

                const mockFees: Fee[] = [
                    {
                        _id: '1',
                        semester: 'Spring 2024',
                        amount: 85000,
                        paid: 85000,
                        dueDate: '2024-04-30',
                        status: 'Paid'
                    },
                    {
                        _id: '2',
                        semester: 'Fall 2023',
                        amount: 78000,
                        paid: 78000,
                        dueDate: '2023-12-15',
                        status: 'Paid'
                    },
                    {
                        _id: '3',
                        semester: 'Summer 2024',
                        amount: 92000,
                        paid: 45000,
                        dueDate: '2024-06-30',
                        status: 'Partially Paid'
                    }
                ];

                setStudent(mockStudent);
                setEditedStudent(mockStudent);
                setDocuments(mockDocuments);
                setFees(mockFees);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        if (status === 'authenticated') {
            fetchStudentData();
        }
    }, [status]);

    const handleEditToggle = () => {
        if (isEditing) {
            setStudent(editedStudent);
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (editedStudent) {
            setEditedStudent({
                ...editedStudent,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        try {
            setTimeout(() => {
                const newDocument: Document = {
                    _id: Date.now().toString(),
                    name: selectedFile.name,
                    type: fileType,
                    uploadDate: new Date().toISOString().split('T')[0],
                    url: URL.createObjectURL(selectedFile),
                    size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
                };

                setDocuments([...documents, newDocument]);
                setSelectedFile(null);
                setUploading(false);

                const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            }, 1500);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploading(false);
        }
    };

    const handleDownload = (url: string, name: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await signOut({ redirect: false });
            router.push('/');
        } catch (error) {
            console.error('Sign out error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredDocuments = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <div className="bg-indigo-600 text-white p-2 rounded-lg mr-3">
                                <FiBookOpen size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Student Portal</h1>
                                <p className="text-xs md:text-sm text-gray-600">Manage your academic journey</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-2 bg-white rounded-full py-1 px-3 shadow-sm">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                    {session.user?.name?.charAt(0) || 'S'}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{session.user?.name || 'Student'}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSignOut}
                                disabled={isLoading}
                                className="hidden md:flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <FiLogOut className="mr-2" />
                                {isLoading ? 'Signing out...' : 'Sign Out'}
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg bg-indigo-100 text-indigo-700"
                            >
                                {mobileMenuOpen ? <FiXCircle size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white shadow-md"
                    >
                        <div className="px-4 py-3 border-t border-gray-200">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                    {session.user?.name?.charAt(0) || 'S'}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{session.user?.name || 'Student'}</p>
                                    <p className="text-xs text-gray-600">Student ID: {student?.studentId}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSignOut}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <FiLogOut className="mr-2" />
                                {isLoading ? 'Signing out...' : 'Sign Out'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Welcome Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-4 md:p-6 text-white mb-6"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome back, {student?.name}!</h2>
                            <p className="opacity-90 text-sm md:text-base">Here's your academic overview and quick access to important resources.</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-3 w-full md:w-auto">
                            <p className="text-sm">Student ID: <span className="font-bold">{student?.studentId}</span></p>
                            <p className="text-sm">Status: <span className="font-bold">{student?.status}</span></p>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-2xl shadow-sm p-1 mb-6 overflow-x-auto">
                    <nav className="flex min-w-max">
                        {[
                            { id: 'profile', label: 'Profile', icon: FiUser },
                            { id: 'documents', label: 'Documents', icon: FiFileText },
                            { id: 'fees', label: 'Fees', icon: FiCreditCard }
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-3 md:px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <Icon className="mr-1 md:mr-2" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Profile Tab */}
                <AnimatePresence mode="wait">
                    {activeTab === 'profile' && student && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                        >
                            {/* Personal Info Card */}
                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-4 md:p-6">
                                <div className="flex justify-between items-center mb-4 md:mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                                    <button
                                        onClick={handleEditToggle}
                                        className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                    >
                                        {isEditing ? (
                                            <>
                                                <FiSave className="mr-1" /> Save
                                            </>
                                        ) : (
                                            <>
                                                <FiEdit className="mr-1" /> Edit
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editedStudent?.name || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium">{student.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                                        <p className="text-gray-900 font-medium">{student.studentId}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editedStudent?.email || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        ) : (
                                            <div className="flex items-center">
                                                <FiMail className="text-gray-400 mr-2" />
                                                <p className="text-gray-900 font-medium">{student.email}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={editedStudent?.phone || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        ) : (
                                            <div className="flex items-center">
                                                <FiPhone className="text-gray-400 mr-2" />
                                                <p className="text-gray-900 font-medium">{student.phone}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                        <div className="flex items-center">
                                            <FiCalendar className="text-gray-400 mr-2" />
                                            <p className="text-gray-900 font-medium">{student.dateOfBirth}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                        <p className="text-gray-900 font-medium">{student.gender}</p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="address"
                                                value={editedStudent?.address || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        ) : (
                                            <div className="flex items-center">
                                                <FiMapPin className="text-gray-400 mr-2" />
                                                <p className="text-gray-900 font-medium">{student.address}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditedStudent(student);
                                            }}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleEditToggle}
                                            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Academic Info Card */}
                            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 md:mb-6">Academic Information</h3>

                                <div className="space-y-4 md:space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Course/Program</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="course"
                                                value={editedStudent?.course || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        ) : (
                                            <div className="flex items-center">
                                                <FiBookOpen className="text-gray-400 mr-2" />
                                                <p className="text-gray-900 font-medium">{student.course}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Enrollment Date</label>
                                        <div className="flex items-center">
                                            <FiCalendar className="text-gray-400 mr-2" />
                                            <p className="text-gray-900 font-medium">{student.enrollmentDate}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                        <div className="flex items-center">
                                            <div className={`h-3 w-3 rounded-full mr-2 ${student.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            <p className="text-gray-900 font-medium">{student.status}</p>
                                        </div>
                                    </div>

                                    {student.sponsor && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Sponsor</label>
                                            <div className="flex items-center">
                                                <FiAward className="text-gray-400 mr-2" />
                                                <p className="text-gray-900 font-medium">{student.sponsor}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Quick Stats */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <h4 className="text-sm font-medium text-gray-700 mb-3">Academic Summary</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                <p className="text-xs text-blue-700">Documents</p>
                                                <p className="text-lg font-bold text-blue-900">{documents.length}</p>
                                            </div>
                                            <div className="bg-green-50 p-3 rounded-lg">
                                                <p className="text-xs text-green-700">Fees Paid</p>
                                                <p className="text-lg font-bold text-green-900">{fees.filter(f => f.status === 'Paid').length}/{fees.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Documents Tab */}
                    {activeTab === 'documents' && (
                        <motion.div
                            key="documents"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden"
                        >
                            <div className="p-4 md:p-6 border-b border-gray-200">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 md:mb-0">My Documents</h3>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiSearch className="text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Search documents..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                                            />
                                        </div>

                                        <button className="flex items-center text-sm font-medium text-gray-700 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                            <FiFilter className="mr-1" />
                                            Filter
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Upload Section */}
                            <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-200">
                                <h4 className="text-md font-medium text-gray-800 mb-4">Upload New Document</h4>
                                <div className="flex flex-col md:flex-row md:items-end gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                                        <div className="relative">
                                            <select
                                                value={fileType}
                                                onChange={(e) => setFileType(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                                            >
                                                <option value="results">Exam Results</option>
                                                <option value="transcript">Academic Transcript</option>
                                                <option value="fees">Fee Structure</option>
                                                <option value="other">Other Document</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <FiChevronDown />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Select File</label>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            onChange={handleFileSelect}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        />
                                    </div>

                                    <button
                                        onClick={handleFileUpload}
                                        disabled={!selectedFile || uploading}
                                        className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                                    >
                                        {uploading ? (
                                            <>Uploading...</>
                                        ) : (
                                            <>
                                                <FiUpload className="mr-2" /> Upload
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Documents List */}
                            <div className="p-4 md:p-6">
                                {filteredDocuments.length === 0 ? (
                                    <div className="text-center py-8 md:py-12">
                                        <FiFileText className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400 mb-3" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-1">No documents found</h3>
                                        <p className="text-gray-500">Get started by uploading your first document.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-3 md:gap-4">
                                        {filteredDocuments.map((doc) => (
                                            <div key={doc._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center mb-2 sm:mb-0">
                                                    <div className={`p-2 md:p-3 rounded-lg mr-3 md:mr-4 ${doc.type === 'results' ? 'bg-blue-100 text-blue-600' :
                                                        doc.type === 'transcript' ? 'bg-purple-100 text-purple-600' :
                                                            doc.type === 'fees' ? 'bg-amber-100 text-amber-600' :
                                                                'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        <FiFileText size={18} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 text-sm md:text-base">{doc.name}</h4>
                                                        <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 mt-1">
                                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize mr-2 ${doc.type === 'results' ? 'bg-blue-100 text-blue-800' :
                                                                doc.type === 'transcript' ? 'bg-purple-100 text-purple-800' :
                                                                    doc.type === 'fees' ? 'bg-amber-100 text-amber-800' :
                                                                        'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                {doc.type}
                                                            </span>
                                                            <span className="mr-2">{doc.size}</span>
                                                            <span>{doc.uploadDate}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDownload(doc.url, doc.name)}
                                                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm md:text-base self-end sm:self-auto"
                                                >
                                                    <FiDownload className="mr-1" /> Download
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Fees Tab */}
                    {activeTab === 'fees' && (
                        <motion.div
                            key="fees"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
                                <div className="p-4 md:p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900">Fee Management</h3>
                                    <p className="text-gray-600 mt-1">View your fee statements and payment history</p>
                                </div>

                                <div className="p-4 md:p-6 overflow-x-auto">
                                    {fees.length === 0 ? (
                                        <div className="text-center py-8 md:py-12">
                                            <FiCreditCard className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400 mb-3" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">No fee records</h3>
                                            <p className="text-gray-500">Fee information will appear here when available.</p>
                                        </div>
                                    ) : (
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {fees.map((fee) => {
                                                    const balance = fee.amount - fee.paid;
                                                    const isOverdue = new Date(fee.dueDate) < new Date() && fee.status !== 'Paid';

                                                    return (
                                                        <tr key={fee._id} className="hover:bg-gray-50">
                                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fee.semester}</td>
                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">KES {fee.amount.toLocaleString()}</td>
                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">KES {fee.paid.toLocaleString()}</td>
                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">KES {balance.toLocaleString()}</td>
                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                <div className="flex items-center">
                                                                    {isOverdue && <FiAlertCircle className="text-red-500 mr-1" />}
                                                                    {fee.dueDate}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4 whitespace-nowrap">
                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${fee.status === 'Paid'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : fee.status === 'Partially Paid'
                                                                        ? 'bg-yellow-100 text-yellow-800'
                                                                        : 'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {fee.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5">
                                    <div className="flex items-center mb-3 md:mb-4">
                                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mr-3">
                                            <FiHelpCircle size={18} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-sm md:text-base">Payment Instructions</h4>
                                    </div>
                                    <ul className="text-xs md:text-sm text-gray-600 space-y-1 md:space-y-2">
                                        <li>1. Visit the finance office</li>
                                        <li>2. Provide your student ID: <span className="font-medium">{student?.studentId}</span></li>
                                        <li>3. Make payment via M-Pesa or bank deposit</li>
                                        <li>4. Collect your receipt</li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5">
                                    <div className="flex items-center mb-3 md:mb-4">
                                        <div className="bg-amber-100 p-2 rounded-lg text-amber-600 mr-3">
                                            <FiClock size={18} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-sm md:text-base">Payment Deadline</h4>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-600">
                                        Please ensure all fees are paid by the due date to avoid penalties or suspension of services. A late payment fee of <span className="font-medium">KES 1,000</span> will be applied after the due date.
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5">
                                    <div className="flex items-center mb-3 md:mb-4">
                                        <div className="bg-green-100 p-2 rounded-lg text-green-600 mr-3">
                                            <FiPhone size={18} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-sm md:text-base">Need Help?</h4>
                                    </div>
                                    <div className="text-xs md:text-sm text-gray-600 space-y-1 md:space-y-2">
                                        <p>Email: <span className="font-medium">finance@university.edu</span></p>
                                        <p>Phone: <span className="font-medium">+254 700 123 456</span></p>
                                        <p>Hours: Mon-Fri, 8:00 AM - 5:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}