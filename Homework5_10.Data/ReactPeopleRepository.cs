using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework5_10.Data
{
    public class ReactPeopleRepository
    {

        private string _connectionString;

        public ReactPeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

  

        public List<Person> GetAll()
        {
            using var context = new ReactPeopleDbContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new ReactPeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void Update(Person person)
        {
            using var context = new ReactPeopleDbContext(_connectionString);
            context.Update(person);
            context.SaveChanges();

        }

        public void Delete(int id)
        {
            using var context = new ReactPeopleDbContext(_connectionString); 
                context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
      
        }

        public void DeleteMany(List<int> ids)
        {
            using var context = new ReactPeopleDbContext(_connectionString);
            foreach(int id in ids)
            {
                context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            }

        }

    }
}
