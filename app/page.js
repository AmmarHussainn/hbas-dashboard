'use client';

import React, { useEffect, useState } from 'react';
import { 
  Building2,
  Briefcase,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  Shield,
  FileText,
  ChevronRight,
  Sparkles,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Globe,
  DollarSign,
  Wrench,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('companies');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-up').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [companies, projects]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [companiesRes, projectsRes] = await Promise.all([
        fetch('https://voice-unitech.onrender.com/api/companies'),
        fetch('https://voice-unitech.onrender.com/api/projects/all')
      ]);

      if (!companiesRes.ok || !projectsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const companiesData = await companiesRes.json();
      const projectsData = await projectsRes.json();

      setCompanies(companiesData.success ? companiesData.data : []);
      setProjects(projectsData.success ? projectsData.data : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredCompanies = companies.filter(company =>
    company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactPersonName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = projects.filter(project =>
    project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { 
      label: 'Total Companies', 
      value: companies.length, 
      icon: Building2
    },
    { 
      label: 'Total Projects', 
      value: projects.length, 
      icon: Briefcase
    },
   
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO HEADER */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#182232]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#182232] via-[#1a2538] to-[#182232]"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#fdc700] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#fdc700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
       
          
          <h1 className="fade-in-up text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Management <span className="text-[#fdc700]">Portal</span>
          </h1>
          
          <p className="fade-in-up text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive overview of all registered companies and project inquiries
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="fade-in-up" style={{animationDelay: `${i * 0.1}s`}}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#182232] mb-4">
                    <stat.icon className="text-[#fdc700]" size={26} strokeWidth={2} />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-[#182232] mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header with Search and Tabs */}
          <div className="mb-12 fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h2 className="text-4xl font-black text-[#182232] mb-2">
                  View <span className="text-[#fdc700]">Records</span>
                </h2>
                <p className="text-gray-600">Manage and review all submissions</p>
              </div>
              
              {/* Search Bar */}
           
            </div>

            {/* Tab Buttons */}
            <div className="flex gap-2 border-b-2 border-gray-100">
              <button
                onClick={() => setActiveTab('companies')}
                className={`px-8 py-4 font-bold rounded-t-2xl transition-all ${
                  activeTab === 'companies' 
                    ? 'bg-white text-[#182232] border-t-2 border-l-2 border-r-2 border-gray-200 shadow-sm' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 size={20} />
                  Companies ({companies.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-8 py-4 font-bold rounded-t-2xl transition-all ${
                  activeTab === 'projects' 
                    ? 'bg-white text-[#182232] border-t-2 border-l-2 border-r-2 border-gray-200 shadow-sm' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Briefcase size={20} />
                  Projects ({projects.length})
                </div>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-[#fdc700] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading data...</p>
            </div>
          )}

          {/* COMPANIES TAB */}
          {!loading && activeTab === 'companies' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCompanies.map((company, i) => (
                <div
                  key={company._id || i}
                  className="fade-in-up bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  style={{animationDelay: `${i * 0.1}s`}}
                  onClick={() => setSelectedItem({ type: 'company', data: company })}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#182232] rounded-2xl flex items-center justify-center">
                        <Building2 className="text-[#fdc700]" size={28} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-[#182232]">{company.companyName || 'N/A'}</h3>
                        <p className="text-sm text-gray-600">{company.businessType || 'N/A'}</p>
                      </div>
                    </div>
                    {company.notBlacklisted ? (
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        Active
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                        Inactive
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <Users className="text-[#fdc700] flex-shrink-0" size={16} />
                      <span className="text-gray-700 font-medium">
                        {company.contactPersonName || 'N/A'} - {company.contactPersonDesignation || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="text-[#fdc700] flex-shrink-0" size={16} />
                      <span className="text-gray-700 font-medium truncate">{company.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="text-[#fdc700] flex-shrink-0" size={16} />
                      <span className="text-gray-700 font-medium">{company.phoneNumber || 'N/A'}</span>
                    </div>
                    {company.companyWebsite && (
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="text-[#fdc700] flex-shrink-0" size={16} />
                        <span className="text-blue-600 font-medium truncate">{company.companyWebsite}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-black text-[#182232]">{company.yearsInOperation || '0'}</div>
                      <div className="text-xs text-gray-600">Years</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-black text-[#182232]">{company.numberOfEmployees || '0'}</div>
                      <div className="text-xs text-gray-600">Employees</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-black text-[#182232]">{company.annualTurnover || 'N/A'}</div>
                      <div className="text-xs text-gray-600">Turnover</div>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {company.areasOfExpertise?.split(',').map((area, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#fdc700] bg-opacity-10 text-[#182232] rounded-full text-xs font-semibold border border-[#fdc700] border-opacity-20">
                        {area.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar size={14} />
                      {formatDate(company.createdAt)}
                    </span>
                    <button className="text-[#182232] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      View Details
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS TAB */}
          {!loading && activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => (
                <div
                  key={project._id || i}
                  className="fade-in-up bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  style={{animationDelay: `${i * 0.1}s`}}
                  onClick={() => setSelectedItem({ type: 'project', data: project })}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#182232] rounded-xl flex items-center justify-center">
                      <Briefcase className="text-[#fdc700]" size={22} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-[#182232]">{project.name || 'N/A'}</h3>
                      <span className="text-xs px-2 py-1 bg-[#fdc700] bg-opacity-10 text-[#182232] rounded-full font-semibold border border-[#fdc700] border-opacity-20">
                        {project.projectType || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="text-[#fdc700] flex-shrink-0" size={14} />
                      <span className="text-gray-700 truncate">{project.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="text-[#fdc700] flex-shrink-0" size={14} />
                      <span className="text-gray-700">{project.phoneNumber || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-3">{project.projectDetails || 'No details provided'}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(project.createdAt)}
                    </span>
                    <button className="text-[#182232] font-bold text-xs flex items-center gap-1">
                      Details
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && activeTab === 'companies' && filteredCompanies.length === 0 && (
            <div className="text-center py-20">
              <Building2 className="mx-auto mb-4 text-gray-300" size={64} />
              <h3 className="text-2xl font-bold text-[#182232] mb-2">No Companies Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}

          {!loading && activeTab === 'projects' && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <Briefcase className="mx-auto mb-4 text-gray-300" size={64} />
              <h3 className="text-2xl font-bold text-[#182232] mb-2">No Projects Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-black text-[#182232]">
                {selectedItem.type === 'company' ? 'Company Details' : 'Project Details'}
              </h2>
              <button 
                onClick={() => setSelectedItem(null)} 
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-2xl text-gray-600">×</span>
              </button>
            </div>

            <div className="p-8">
              {selectedItem.type === 'company' ? (
                <CompanyDetails data={selectedItem.data} />
              ) : (
                <ProjectDetails data={selectedItem.data} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Company Details Component
const CompanyDetails = ({ data }) => (
  <div className="space-y-6">
    {/* Company Name & Status */}
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-3xl font-black text-[#182232] mb-2">{data.companyName || 'N/A'}</h3>
        <p className="text-lg text-gray-600">{data.businessType || 'N/A'}</p>
      </div>
      {data.notBlacklisted ? (
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-2">
          <CheckCircle size={16} />
          Not Blacklisted
        </span>
      ) : (
        <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold flex items-center gap-2">
          <XCircle size={16} />
          Blacklisted
        </span>
      )}
    </div>

    {/* Contact Person */}
    <div className="bg-opacity-5 rounded-2xl p-6 border border-[#fdc700] border-opacity-20">
      <h4 className="font-black text-[#182232] mb-4 flex items-center gap-2">
        <Users className="text-[#fdc700]" size={20} />
        Contact Person
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Name</p>
          <p className="font-bold text-[#182232]">{data.contactPersonName || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Designation</p>
          <p className="font-bold text-[#182232]">{data.contactPersonDesignation || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Email</p>
          <p className="font-bold text-[#182232]">{data.email || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Phone</p>
          <p className="font-bold text-[#182232]">{data.phoneNumber || 'N/A'}</p>
        </div>
      </div>
    </div>

    {/* Company Info Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-50 rounded-2xl p-4 text-center">
        <Calendar className="mx-auto mb-2 text-[#fdc700]" size={24} />
        <p className="text-2xl font-black text-[#182232]">{data.yearsInOperation || '0'}</p>
        <p className="text-sm text-gray-600">Years in Operation</p>
      </div>
      <div className="bg-gray-50 rounded-2xl p-4 text-center">
        <Users className="mx-auto mb-2 text-[#fdc700]" size={24} />
        <p className="text-2xl font-black text-[#182232]">{data.numberOfEmployees || '0'}</p>
        <p className="text-sm text-gray-600">Employees</p>
      </div>
      <div className="bg-gray-50 rounded-2xl p-4 text-center">
        <DollarSign className="mx-auto mb-2 text-[#fdc700]" size={24} />
        <p className="text-2xl font-black text-[#182232]">{data.annualTurnover || 'N/A'}</p>
        <p className="text-sm text-gray-600">Annual Turnover</p>
      </div>
    </div>

    {/* Additional Details */}
    <div className="space-y-4">
      <DetailRow icon={MapPin} label="Office Address" value={data.officeAddress} />
      <DetailRow icon={Globe} label="Website" value={data.companyWebsite} />
      <DetailRow icon={Award} label="Areas of Expertise" value={data.areasOfExpertise} />
      <DetailRow icon={Shield} label="Relevant Licenses" value={data.relevantLicenses} />
      <DetailRow icon={FileText} label="Registration Number" value={data.companyRegistrationNumber} />
      <DetailRow icon={FileText} label="Tax Registration" value={data.taxRegistrationNumber} />
      <DetailRow icon={Wrench} label="Equipment Owned" value={data.equipmentOwned} />
      <DetailRow icon={AlertCircle} label="HSE Policy" value={data.hsePolicy} />
    </div>

    {/* Past Projects */}
    {data.pastProjectReferences && (
      <div className=" bg-opacity-5 rounded-2xl p-6 border border-[#182232] border-opacity-20">
        <h4 className="font-black text-[#182232] mb-3 flex items-center gap-2">
          <Award className="text-[#182232]" size={20} />
          Past Project References
        </h4>
        <p className="text-gray-700 leading-relaxed">{data.pastProjectReferences}</p>
      </div>
    )}

    {/* Safety Record */}
    {data.safetyRecord && (
      <div className=" bg-opacity-5 rounded-2xl p-6 border border-[#182232] border-opacity-20">
        <h4 className="font-black text-[#182232] mb-3 flex items-center gap-2">
          <Shield className="text-[#182232]" size={20} />
          Safety Record
        </h4>
        <p className="text-gray-700 leading-relaxed">{data.safetyRecord}</p>
      </div>
    )}

    {/* Company Profile */}
    {data.companyProfile && (
      <div className="bg-gray-50 rounded-2xl p-6">
        <h4 className="font-black text-[#182232] mb-3 flex items-center gap-2">
          <FileText className="text-gray-600" size={20} />
          Company Profile
        </h4>
        <p className="text-gray-700 leading-relaxed">{data.companyProfile}</p>
      </div>
    )}

    {/* Registration Date */}
    <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
      <span className="text-sm text-gray-500 flex items-center gap-2">
        <Calendar size={16} />
        Registered on {formatDate(data.createdAt)}
      </span>
    </div>
  </div>
);

// Project Details Component
const ProjectDetails = ({ data }) => (
  <div className="space-y-6">
    {/* Project Header */}
    <div>
      <h3 className="text-3xl font-black text-[#182232] mb-2">{data.name || 'N/A'}</h3>
      <span className="inline-block px-4 py-2 bg-[#fdc700] text-[#182232] rounded-full text-sm font-bold">
        {data.projectType || 'N/A'}
      </span>
    </div>

    {/* Contact Details */}
    <div className=" bg-opacity-5 rounded-2xl p-6 border border-[#182232] border-opacity-20">
      <h4 className="font-black text-[#182232] mb-4 flex items-center gap-2">
        <Mail className="text-[#182232]" size={20} />
        Contact Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">Email Address</p>
          <p className="font-bold text-[#182232]">{data.email || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Phone Number</p>
          <p className="font-bold text-[#182232]">{data.phoneNumber || 'N/A'}</p>
        </div>
      </div>
    </div>

    {/* Project Details */}
    <div className=" bg-opacity-5 rounded-2xl p-6 border border-[#fdc700] border-opacity-20">
      <h4 className="font-black text-[#182232] mb-3 flex items-center gap-2">
        <FileText className="text-[#fdc700]" size={20} />
        Project Requirements
      </h4>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{data.projectDetails || 'No details provided'}</p>
    </div>

    {/* Submission Date */}
    <div className="flex items-center justify-between pt-4 border-t-2 border-gray-200">
      <span className="text-sm text-gray-500 flex items-center gap-2">
        <Calendar size={16} />
        Submitted on {formatDate(data.createdAt)}
      </span>
    </div>
  </div>
);

// Helper Component for Detail Rows
const DetailRow = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
      <Icon className="text-[#fdc700] flex-shrink-0 mt-1" size={18} />
      <div className="flex-1">
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="font-bold text-[#182232]">{value}</p>
      </div>
    </div>
  );
};

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default AdminDashboard;