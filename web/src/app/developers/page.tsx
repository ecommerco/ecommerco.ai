import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import { ArrowRight, Code, Terminal, Book, Box, Layers, Cpu, Database, Globe, Lock } from "lucide-react";
import Link from "next/link";

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Navigation */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-28 h-[calc(100vh-120px)] overflow-y-auto pr-4 border-r border-white/10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <nav className="flex flex-col gap-8">
                <div>
                  <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-wider mb-4">Getting Started</h4>
                  <ul className="flex flex-col gap-3 text-sm text-gray-400">
                    <li><Link href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary"></span>Introduction</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Quick Start</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Architecture</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-wider mb-4">Core Concepts</h4>
                  <ul className="flex flex-col gap-3 text-sm text-gray-400">
                    <li><Link href="#" className="hover:text-white transition-colors">Ecommerco.ai Backend</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Ecommerco.ai Frontend</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Middleware</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-wider mb-4">API Reference</h4>
                  <ul className="flex flex-col gap-3 text-sm text-gray-400">
                    <li><Link href="#" className="hover:text-white transition-colors">Authentication</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Products</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Carts & Checkout</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">Orders</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-wider mb-4">SDKs & Tools</h4>
                  <ul className="flex flex-col gap-3 text-sm text-gray-400">
                    <li><Link href="#" className="hover:text-white transition-colors">JavaScript SDK</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">React Hooks</Link></li>
                    <li><Link href="#" className="hover:text-white transition-colors">CLI</Link></li>
                  </ul>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              
              {/* Header Section */}
              <div className="mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-mono text-primary mb-6">
                  <Terminal className="w-3 h-3" />
                  <span>v2.4.0 Documentation</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                  Developer <span className="text-primary">API</span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Build scalable commerce experiences with our headless architecture. 
                  Powered by <span className="text-white font-medium">Ecommerco.ai</span> backend and <span className="text-white font-medium">Next.js</span> frontend.
                </p>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-16">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Backend Setup</h3>
                  <p className="text-sm text-gray-400">Configure your Ecommerco.ai engine, database, and Redis instances.</p>
                </div>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Frontend Integration</h3>
                  <p className="text-sm text-gray-400">Connect your Next.js storefront to the commerce engine.</p>
                </div>
              </div>

              {/* Documentation Content */}
              <div className="space-y-16">
                
                {/* Section: Authentication */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Authentication</h2>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Ecommerco.ai uses JWT-based authentication for secure communication between the client and the Ecommerco.ai backend. Include your API key in the header of every request.
                  </p>
                  
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                      </div>
                      <span className="text-xs font-mono text-gray-500">bash</span>
                    </div>
                    <div className="p-6 overflow-x-auto">
                      <pre className="font-mono text-sm text-gray-300">
                        <span className="text-purple-400">curl</span> -X GET https://api.ecommerco.ai/store/products \<br/>
                        &nbsp;&nbsp;-H <span className="text-green-400">&quot;Authorization: Bearer &lt;YOUR_API_KEY&gt;&quot;</span>
                      </pre>
                    </div>
                  </div>
                </section>

                {/* Section: Fetching Products */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Box className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Fetching Products</h2>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Retrieve a list of products from your store. Supports filtering, pagination, and search out of the box.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Request */}
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
                      <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                        <span className="text-xs font-mono text-gray-500">Next.js (App Router)</span>
                      </div>
                      <div className="p-6 overflow-x-auto">
                        <pre className="font-mono text-xs text-gray-300 leading-relaxed">
                          <span className="text-purple-400">import</span> {"{ ecommercoClient }"} <span className="text-purple-400">from</span> <span className="text-green-400">&quot;@lib/config&quot;</span>;<br/><br/>
                          <span className="text-blue-400">export async function</span> <span className="text-yellow-400">getProducts</span>() {"{"}<br/>
                          &nbsp;&nbsp;<span className="text-blue-400">const</span> {"{ products }"} = <span className="text-blue-400">await</span> ecommercoClient.products.<span className="text-yellow-400">list</span>();<br/>
                          &nbsp;&nbsp;<span className="text-blue-400">return</span> products;<br/>
                          {"}"}
                        </pre>
                      </div>
                    </div>

                    {/* Response */}
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
                      <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                        <span className="text-xs font-mono text-gray-500">JSON Response</span>
                      </div>
                      <div className="p-6 overflow-x-auto">
                        <pre className="font-mono text-xs text-gray-400 leading-relaxed">
                          {"{"}<br/>
                          &nbsp;&nbsp;<span className="text-green-400">&quot;products&quot;</span>: [<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;{"{"}<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">&quot;id&quot;</span>: <span className="text-yellow-400">&quot;prod_01G...&quot;</span>,<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">&quot;title&quot;</span>: <span className="text-yellow-400">&quot;Neural Shirt&quot;</span>,<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">&quot;variants&quot;</span>: [...]<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br/>
                          &nbsp;&nbsp;],<br/>
                          &nbsp;&nbsp;<span className="text-green-400">&quot;count&quot;</span>: 1<br/>
                          {"}"}
                        </pre>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </main>

      <CallToAction />
    </div>
  );
}
