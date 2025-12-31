'use client';

import React from 'react';

const BaCongKhaiHero = () => {
    return (
        <section
            className="relative py-16 md:py-24 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)'
            }}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center">
                    {/* Breadcrumb */}
                    <nav className="text-sm mb-6 text-blue-200">
                        <a href="/" className="hover:text-white transition-colors">Trang chủ</a>
                        <span className="mx-2">/</span>
                        <a href="#" className="hover:text-white transition-colors">Giới thiệu</a>
                        <span className="mx-2">/</span>
                        <span className="text-yellow-300">Ba Công Khai</span>
                    </nav>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Ba Công Khai
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                        Thông tin công khai về cam kết chất lượng đào tạo, điều kiện đảm bảo chất lượng
                        và thu chi tài chính của Trường Cao đẳng Thông tin và Truyền thông
                    </p>

                    {/* Decorative line */}
                    <div className="mt-8 flex justify-center">
                        <div className="w-24 h-1 bg-yellow-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BaCongKhaiHero;
