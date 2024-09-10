using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ziaexam.Models;

namespace ziaexam.Data
{
    public class ziaexamContext : DbContext
    {
        public ziaexamContext (DbContextOptions<ziaexamContext> options)
            : base(options)
        {
        }

        public DbSet<ziaexam.Models.Person> Person { get; set; } = default!;
    }
}
