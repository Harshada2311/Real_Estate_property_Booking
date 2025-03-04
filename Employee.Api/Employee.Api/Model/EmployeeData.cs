﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Employee.Api.Model
{
    public class EmployeeData
    {

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeId { get; set; }
        [Required]
        [MaxLength(50)]
        public string firstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string lastName { get; set; }

        public string email { get; set; }
        [Required]
        [MaxLength(10)]
        public string contact { get; set; }

        public string city { get; set; }
        public string address { get; set; }



    }
}
